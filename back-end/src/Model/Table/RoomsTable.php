<?php
namespace App\Model\Table;

use Cake\I18n\Date;
use Cake\ORM\Query;
use Cake\ORM\Table;
use Cake\I18n\FrozenDate;
use Cake\ORM\RulesChecker;
use Cake\Validation\Validator;

class RoomsTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('rooms');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Structures');
        $this->hasMany('Reservations', [
            'dependent' => true,
        ]);
        $this->hasMany('RoomAvailabilities', [
            'dependent' => true,
        ]);

        $this->addBehavior('Timestamp');
    }

    public function findStructures(Query $query, array $options){
        return $query->contain(['Structures' => function($q){
            return $q->select(['nome']);
        }]);
    }

    public function findDisponibile(Query $query, array $options){
        return $query
        ->contain('RoomAvailabilities', function($q) use ($options){
            return $q->where([
                'RoomAvailabilities.data_da >=' => $options['data_da'],
                'RoomAvailabilities.data_a <='  => $options['data_a'],
            ]);
        });
    }

    /**
     * Determina la disponibilità delle stanze 
     * - per il periodo di tempo passato (data_da, data_a)
     * - eventualmente per il camp_id
     *
     * @param Query $query
     * @param array $options
     * @return Query
     */
    public function findOccupazione(Query $query, array $options)
    {
        return $query
            ->formatResults(function ($results) use ($options) {
                return $results->map(function ($row) use ($options) {
                    $dataDa = new FrozenDate($options['data_da']);
                    $dataA  = new FrozenDate($options['data_a']);
                    $days = [];
                    $disponibilitaPeriodo = 'libera';
                    // Loop per giorni
                    $giornoIdx = 0;
                    while(($d = $dataDa->addDays($giornoIdx)) < $dataA) // < e non <= perché l'ultimo giorno la stanza è libera
                    {
                        // TODO Ottimizzare facendo una count per ogni situazione in/ou/stay e anziché filtrare per room_ids
                        // raggruppare per room_id, così da avere solo 3 query anziché 300, e portare questo loop fuori dal map
                        // per poi processare i dati all'interno di questo while che rimane qui
                        $baseQuery = $this->Reservations->find();
                        $conditions = ['room_id' => $row->id];
                        if(!empty($options['camp_id']))
                            $conditions['camp_id'] = $options['camp_id'];

                        // Cerco quanti fanno check in, out e quanti permangono
                        $day = [
                            'date' => $d,
                            'in'   
                                => $baseQuery->where($conditions + ['data_previsto_in' => $d], [], Query::OVERWRITE)->count(),
                            'out'  
                                => $baseQuery->where($conditions + ['data_previsto_out' => $d], [], Query::OVERWRITE)->count(),
                            'stay' 
                                => $baseQuery->where($conditions + ['data_previsto_in <' => $d, 'data_previsto_out >' => $d], [], Query::OVERWRITE)->count(),
                        ];
                        // TODO Valutare se inserire qua anche la valutazione di prenotazione RoomAvailabilities

                        // Calcolo la disponibilità per il giorno
                        $day['posti_liberi'] = $row->posti_letto - $day['stay'] - $day['in'];
                        $day['disponibilita'] = $this->__getDisponibilita($row->posti_letto, $day['posti_liberi']);
                        $days[$giornoIdx] = $day;
                        $giornoIdx++;

                        // Aggiorno la disponibilità per il periodo
                        if($day['disponibilita'] == 'parziale')
                            $disponibilitaPeriodo = 'parziale';
                        elseif($day['disponibilita'] == 'occupata' && $disponibilitaPeriodo == 'libera')
                            $disponibilitaPeriodo = 'occupata';
                    }
                    $row->days = $days;
                    $row->disponibilita = $disponibilitaPeriodo;
                    // logd($row); 
                    // TODO
                    $row->posti_liberi = $row->days[0]['posti_liberi'];
                    $row->posti_occupati = $row->posti_letto;
                    $row->perc_occupazione = round($row->posti_occupati / $row->posti_letto * 100, 2);
                    if($row->perc_occupazione > 100)
                        $row->perc_occupazione = 100;
                    return $row;
                });
            })
        ;
    }

    private function __getDisponibilita($postiLetto, $postiDisponibli)
    {
        if($postiDisponibli == 0)
            return 'occupata';
        return $postiDisponibli == $postiLetto ? 'libera' : 'parziale';
    }
}

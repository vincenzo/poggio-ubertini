<?php
namespace App\Model\Table;

use Cake\I18n\Date;
use Cake\ORM\Query;
use Cake\ORM\Table;
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
                    $dataDa = new Date($options['data_da']);
                    $dataA  = new Date($options['data_a']);
                    $days = [];
                    $disponibilitaPeriodo = 'libera';
                    // Loop per giorni
                    $giornoIdx = 0;
                    while($dataDa->addDays($giornoIdx) <= $dataA)
                    {
                        $baseQuery = $this->Reservations->find()->where(['room_id' => $row->id]);
                        if(!empty($options['camp_id']))
                            $baseQuery = $baseQuery->where(['camp_id' => $options['camp_id']]);

                        // Cerco quanti fanno check in, out e quanti permangono
                        $day = [
                            'date' => $dataDa->addDays($giornoIdx),
                            'in'   => $baseQuery->where(['data_previsto_in' => $dataDa])->count(),
                            'out'  => $baseQuery->where(['data_previsto_out' => $dataA])->count(),
                            'stay' => $baseQuery->where(['data_previsto_in <' => $dataDa, 'data_previsto_out >' => $dataA])->count(),
                        ];
                        // TODO Valutare se inserire qua anche la valutazione di prenotazione RoomAvailabilities

                        // Calcolo la disponibilità per il giorno
                        $day['posti_liberi'] = $row->posti_letto - $day['stay'] - $day['in'] + $day['out'];
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
                    $row->posti_occupati = 0;
                    $row->posti_liberi = $row->posti_letto - $row->posti_occupati;
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

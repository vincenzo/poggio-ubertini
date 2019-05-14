<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
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

    public function findOccupazione(Query $query, array $options)
    {
        $prenotazioni = $this->Reservations->find()
            ->where([
                'data_in  >=' => $options['data'],
                'data_out <=' => $options['data'],
            ])
            ->select(['data_in', 'data_out', 'room_id'])
            ->contain([
                'Guests' => function($q){ return $q->select(['nome', 'cognome']); },
            ])
            ->groupBy('room_id')
        ;
        // logd($prenotazioni);

        return $query
            ->formatResults(function ($results){
                return $results->map(function ($row) {
                    logd($row);
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
        

}

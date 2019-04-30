<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

class ReservationsTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('reservations');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Camps', [
          'foreignKey' => 'camp_id',
        ]);

        $this->belongsTo('Guests', [
          'foreignKey' => 'guest_id',
        ]);

        $this->belongsTo('Rooms', [
          'foreignKey' => 'room_id',
        ]);

        $this->belongsTo('Reservations', [
          'foreignKey' => 'reservation_id',
        ]);
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        return $validator;
    }

}

<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

class RoomAvailabilitiesTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('room_availabilities');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Rooms');
        $this->belongsTo('Camps');

        // $this->addBehavior('Timestamp');
    }        

}

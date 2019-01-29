<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

class StructuresTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('structures');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('Rooms');

        $this->addBehavior('Timestamp');
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        return $validator;
    }

}

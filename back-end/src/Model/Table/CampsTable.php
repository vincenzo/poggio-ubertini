<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

class CampsTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('camps');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('Reservations', [
            'dependent' => true,
        ]);

        $this->hasOne('UploadIpotesiSpesa', [
            'className' => 'Uploads',
            'conditions' => ['categoria' => 'ipotesi_spesa', 'model_name' => 'Camps'],
            'foreignKey' => 'model_id'
        ]);

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

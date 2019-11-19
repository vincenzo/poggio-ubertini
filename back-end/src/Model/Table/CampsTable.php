<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\Table;
use Cake\Event\Event;
use App\Model\Entity\Camp;
use Cake\ORM\RulesChecker;
use Cake\Validation\Validator;
use Cake\Database\Schema\TableSchema;

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

    protected function _initializeSchema(TableSchema $schema)
    {
        $schema->setColumnType('consuntivo', 'json');
        return $schema;
    }
    
    public function beforeSave(Event $event, Camp $entity, \ArrayObject $options)
    {
        if($entity->chiuso == true && $entity->isDirty('chiuso')) {
            $this->consuntivo = $this->_generaConsuntivo($entity);
        }
        return true;
    }

    // TODO
    protected function _generaConsuntivo($e)
    {
        return [];
    }

}

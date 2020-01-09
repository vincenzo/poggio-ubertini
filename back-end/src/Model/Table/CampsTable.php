<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\Table;
use Cake\Event\Event;
use App\Model\Entity\Camp;
use Cake\ORM\RulesChecker;
use Cake\ORM\TableRegistry;
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
            $this->consuntivo = $this->generaConsuntivo($entity);
        }
        return true;
    }

    // TODO
    public function generaConsuntivo($e)
    {
        $this->camp = $e;
        $this->__getGroupedReservations();
        $this->__getCampRates();
        debug($this->resData->toArray());
        return [];
    }

    private function __getGroupedReservations()
    {
        $this->resData = $this->Reservations->find()
            ->where(['camp_id' => $this->camp->id])
            ->contain(['Guests'])
            ->groupBy('room_id')
        ;
    }

    private function __getCampRates()
    {
        $this->campRates = TableRegistry::get('Rates')->find()
            ->where([
                'data_da <=' => $this->camp->data_in,
                'OR' => [
                    'data_a >=' => $this->camp->data_a,
                    'data_a IS' => null
                ]
            ]);
    }

}

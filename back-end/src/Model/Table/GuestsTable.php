<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\Table;
use Cake\Event\Event;
use Cake\ORM\RulesChecker;
use App\Model\Entity\Guest;
use Cake\Validation\Validator;

class GuestsTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('guests');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        return $validator;
    }

    public function beforeSave(Event $event, Guest $entity, \ArrayObject $options)
    {
        $entity->residente_montespertoli = stripos($entity->citta, 'montespertoli') !== false;
        return true;
    }

}

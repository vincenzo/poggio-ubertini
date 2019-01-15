<?php
namespace App\Model\Table;

use App\Model\Entity\Note;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\Event\Event;

class NotesTable extends Table
{

    var $enabledModels = [
        'Clients',
    ];

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('notes');
        $this->setDisplayField('text');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Users');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->notEmpty('model_name')
            ->inList('model_name', $this->enabledModels);

        $validator
            ->notEmpty('model_id');

        $validator
            ->allowEmpty('user_id');

        $validator
            ->notEmpty('text');

        $validator
            ->boolean('flag')
            ->allowEmpty('flag');

        return $validator;
    }

    public function beforeMarshal(Event $event, \ArrayObject $data, \ArrayObject $options)
    {
        if(isset($data['created']))
            unset($data['created']);
        return $data;
    }
    

    public function beforeSave(Event $event, Note $entity, \ArrayObject $options){
        
        if(!$entity->isNew())
        {
            // TODO
            // La nota è modificabile solo entro 24 ore
        }
        else
        {
            // TODO
            // Popola automaticamente user_id in base all'utente loggato
        }

        return true;
    }

    /**
     * Crea rapidamente una nota 
     * 
     * @param  Accetta le variabili model_name, model_id, log_level, user_id, text
     * @return bool
     */
    public function log($model_name, $model_id, $text, $log_level = 1, $user_id = null)
    {
        $e = $this->newEntity(compact('model_name', 'model_id', 'user_id', 'text', 'log_level'));
        return $this->save($e);

    }
    
}

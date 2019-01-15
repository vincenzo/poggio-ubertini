<?php
namespace App\Model\Table;

use App\Model\Entity\Upload;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\Event\Event;
use Intervention\Image\ImageManagerStatic as Image;
use Cake\Database\Schema\TableSchema as Schema;

class UploadsTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('uploads');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('BuyDocuments', [
            'foreignKey' => 'model_id',
            'conditions' => ['model_name' => 'BuyDocuments'],
            'joinType' => 'INNER'
        ]);

        $this->belongsTo('EmployeeDocuments', [
            'foreignKey' => 'model_id',
            'conditions' => ['model_name' => 'EmployeeDocuments'],
            'joinType' => 'INNER'
        ]);
    }

    protected function _initializeSchema(Schema $schema)
    {
        $schema->setColumnType('extra_data', 'json');
        return $schema;
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->add('id', 'valid', ['rule' => 'numeric'])
            ->allowEmpty('id', 'create');

        $validator
            ->requirePresence('file')
            ->notEmpty('file');
        
        $validator
            ->requirePresence('model_id')
            ->notEmpty('model_id');
        
        $validator
            ->requirePresence('model_name')
            ->notEmpty('model_name');


        return $validator;
    }

    public function afterSave(Event $event, Upload $entity, \ArrayObject $options)
    {
        if(!empty($entity->file_name) && $entity->isDirty('file_name'))
        {
            $QueuedJobs = \Cake\ORM\TableRegistry::get('Queue.QueuedJobs');
            $QueuedJobs->createJob('GeneratePreview', ['id' => $entity->id]);
        }
    }
    
    public function afterDelete(Event $event, Upload $entity, \ArrayObject $options){
        $this->deleteAttachment($entity, $entity->file_name);
    }

    public function deleteAttachment($entity, $filename = '')
    {
        if(empty($filename))
            $filename = $entity->file_name;
        @unlink($entity->getFullPath($filename));
        @unlink($entity->getPreviewsFullPath());
    }
    
}

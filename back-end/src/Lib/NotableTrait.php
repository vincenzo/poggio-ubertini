<?php
namespace App\Lib;

use Cake\ORM\Query;

/**
 * Per usare le note su un model è sufficiente attaccarci questo trait e collegare la Table con l'associazione a Notes
 *
 *       $this->hasMany('Notes', [
 *          'conditions' => ['model_name' => 'Clients'],
 *          'foreignKey' => 'model_id',
 *       ]);
 *       
 * Sul controller (nella _entityQuery probabilmente) richiama il finder Notes
 *
 * 		->find('notes')
 *
 * log_level permette di categorizzare le note generate automaticamente in vari livelli di log
 * - 1 sono le note generate dal sistema che devono essere visibili all'utente
 * - 2 sono note che possono essere usate ai fini di debug
 *
 */

trait NotableTrait {

	public function findNotes(Query $query, array $options)
	{
	    return $query->contain(['Notes' => function($q) use ($options) {
	    	return $q
	    		->contain(['Users'])
	    		->select(['Notes.id', 'Notes.model_id', 'Notes.user_id', 'Notes.text', 'Notes.flag', 'Notes.log_level', 'Notes.created', 'Users.username'])
	    		->order(['Notes.id' => 'DESC'])
	    	;
	    }]);
	}
		
}
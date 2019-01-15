<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;

class NotesController extends AppController
{
    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Crud->disable(['Index', 'View']);
    }

    

}

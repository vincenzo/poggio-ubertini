<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;

class CitiesController extends AppController
{
    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Crud->disable(['Index', 'Add', 'Edit', 'Delete']);
    }

    public function search()
    {
        $this->requireFields(['comune']);
        $q = $this->request->getData('comune');
        
        $r = $this->Cities->find('all')->where(['comune COLLATE UTF8_GENERAL_CI LIKE' => "$q%"])->limit(10);

        $this->_setJson(true, $r);
    }

}
<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Entheos\Utils\Lib\TokenTrait;

class UsersController extends AppController
{
    use TokenTrait;

    public $paginate = [
        'page' => 1,
        'limit' => 25,
        'maxLimit' => 500,
        'fields' => [
            'id', 'username', 'email', 'role', 'attivo',
        ],
        'sortWhitelist' => [
            'id', 'username', 'email', 'role', 'attivo'
        ]
    ];

    public $filterWhitelist = [
        'Users' => [
            'id'              => 'integer',
            'username'        => 'like',
            'email'           => 'like',
            'role'            => 'string',
            'attivo'          => 'boolean',
        ],
    ];


    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
    }

    public function index()
    {
        $q = $this->Users
            ->find('all')
            ;

        $this->filterPaginate($q);
    }

    public function initialize()
    {
        parent::initialize();
        $this->activeUserConditions = ['attivo' => true];
        $this->Auth->allow(['token']);
        // $this->Auth->allow(['add']);
    }

    /**
     * Restituisce i ruoli utente disponibili
     * @return array
     */
    public function roles()
    {
        $roles = $this->Users->getRoles();
        $this->_setJson(true, $roles);
    }
}

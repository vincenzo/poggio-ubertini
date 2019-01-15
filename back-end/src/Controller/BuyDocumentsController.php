<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\Network\Exception\BadRequestException;
use Cake\Network\Exception\NotFoundException;

class BuyDocumentsController extends AppController
{

    public $filterWhitelist = [
        'BuyDocuments' => [
            'data_documento' => 'date-range',
            'data_scadenza'  => 'date-range',
            'data_pagamento' => 'date-range',
        ],
        'Clients' => [
            'ragione_sociale' => 'like',
        ],
    ];

    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
    }

    public function index()
    {
        $q = $this->BuyDocuments
            ->find('all')
            ->contain('Clients')
            ;

        $this->filterPaginate($q);
    }

    /**
     * Metodo comume per l'arricchimento della query, per funzioni view e add/edit post save
     * @param Query $query la query con già impostata la ricerca per ottenere il record
     * @return Query
     */
    public function _entityQuery($query, $id){
        return $query
            ->contain('Clients')
            ->contain('Uploads');
    }

    /**
     * Recupera gli item in scadenza e quelli scaduti (30 gg)
     */
    public function getScadenze()
    {
        $scadenze = $this->BuyDocuments->find('all')
            ->where(['data_scadenza <=' => (new \Cake\Chronos\Date)->modify('+30 days')])
            ->order(['data_scadenza' => 'ASC'])
        ;

        $this->_setJson(true, $scadenze);
    }

}

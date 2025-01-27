<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Entheos\Utils\Exception\WarningException;
use Entheos\Utils\Exception\ErrorException;

class RoomAvailabilitiesController extends AppController
{
    // Restituiamo sempre tutto, non usiamo il paginate
    public $paginate = [
        'page' => 1,
        'limit' => 250,
        'maxLimit' => 250,
        'fields' => [
            'id',
        ],
        'sortWhitelist' => [
            'id',
        ],
        'order'  => ['id' => 'DESC'],
    ];

    public $filterWhitelist = [
        'RoomAvailabilities' => [
        ],
    ];

    public function index()
    {
        $data = $this->request->getData('data');

        $q = $this->RoomAvailabilities
            ->find('all')
            ;

        $this->filterPaginate($q);
    }

    /**
     * Metodo comume per l'arricchimento della query, per funzioni view e add/edit post save
     * @param Query $query la query con già impostata la ricerca per ottenere il record
     * @return Query
     */
    public function _entityQuery($query, $id){
        return $query;
    }
}

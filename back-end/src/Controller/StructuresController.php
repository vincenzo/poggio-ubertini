<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Entheos\Utils\Exception\WarningException;
use Entheos\Utils\Exception\ErrorException;

class StructuresController extends AppController
{
    public $paginate = [
        'page' => 1,
        'limit' => 25,
        'maxLimit' => 250,
        'fields' => [
            'id', 'nome',
        ],
        'sortWhitelist' => [
            'id',
        ],
        'order'  => ['nome' => 'ASC'],
    ];

    public $filterWhitelist = [
        'Structures' => [
        ],
    ];

    public function index()
    {
        $q = $this->Structures
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

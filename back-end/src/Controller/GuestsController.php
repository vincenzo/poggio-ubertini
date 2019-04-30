<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Entheos\Utils\Exception\WarningException;
use Entheos\Utils\Exception\ErrorException;

class GuestsController extends AppController
{
    public $paginate = [
        'page' => 1,
        'limit' => 25,
        'maxLimit' => 250,
        'fields' => [
            'id', 'nome', 'cognome', 'capogruppo', 'codice_fiscale', 'data_nascita', 'citta_nascita', 'provincia_nascita', 'nazione_nascita', 'privacy', 'genere',
        ],
        'sortWhitelist' => [
            'id',
        ],
        'order'  => ['id' => 'DESC'],
    ];

    public $filterWhitelist = [
        'Guests' => [
            'capogruppo' => 'boolean',
        ],
    ];

    public function index()
    {
        $q = $this->Guests
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

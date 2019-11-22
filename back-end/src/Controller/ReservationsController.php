<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Entheos\Utils\Exception\WarningException;
use Entheos\Utils\Exception\ErrorException;

class ReservationsController extends AppController
{
    public $paginate = [
        'page' => 1,
        'limit' => 25,
        'maxLimit' => 250,
        'fields' => [
            'id', 'data_in', 'data_out', 'Camps.nome', 'Guests.nome', 'Guests.cognome', 'Rooms.numero'
        ],
        'sortWhitelist' => [
            'id',
        ],
        'order'  => ['id' => 'DESC'],
    ];

    public $filterWhitelist = [
        'Reservations' => [
        ],
    ];

    public function index()
    {
        $q = $this->Reservations
            ->find('all')
            ->contain('Camps')
            ->contain('Guests')
            ->contain('Rooms')
            ;

        $this->filterPaginate($q);
    }

    /**
     * Metodo comume per l'arricchimento della query, per funzioni view e add/edit post save
     * @param Query $query la query con già impostata la ricerca per ottenere il record
     * @return Query
     */
    public function _entityQuery($query, $id){
        return $query->contain(['Rooms', 'Rooms.Structures']);
    }

    /**
     * Rimuove il room_id da una prenotazione
     *
     * @return void
     */
    public function removeRoom()
    {
        $this->requireFields(['id']);
        $r = $this->Reservations->get($this->request->getData('id'));
        $r->room_id = null;
        $success = $this->Reservations->save($r);
        $this->_setJson($success, null);
    }

    /**
     * Punto di ingresso per tutte le funzioni che agiscono massivamente su più record
     * Accetta in POST
     * - action e chiama una funzione protected con lo stesso nome
     * - elenco di ids
     * - params[]
     * @return void
     */
    public function multiActions()
    {
        $this->requireFields(['action', 'ids']);

        $action = \Cake\Utility\Inflector::camelize($this->request->getData('action'));
        $ids = $this->request->getData('ids');

        $res = [0 => 0, 1 => 0];

        foreach($ids as $id)
        {
            $r = $this->Reservations->find()->where(['Reservations.id' => $id])->contain('Camps')->first();
            if($this->{'_mact_'.$action}($r, $this->request->getData('params')))
                $res[1]++;
            else
                $res[0]++;
        }

        if(empty($res[1]))
            throw new WarningException("Non è stato processato nessun elemento: $res[0] errori");

        $ret = ['message' => sprintf('Processati %d elementi, %d errori', $res[1], $res[0])];

        $this->_setJson(true, $ret);
    }

    /**
     * Multiaction child
     * Assegna più prenotazioni a una stanza
     * @return boolean
     */
    protected function _mact_assignRoom($r, $params = [])
    {
        if(empty($params['room_id']))
            throw new WarningException("Sotto params manca 'room_id'");

        $r->data_previsto_in = $this->request->getData('data_previsto_in', $r->camp->data_inizio);
        $r->data_previsto_out = $this->request->getData('data_previsto_out', $r->camp->data_fine);
        $r->room_id = $params['room_id'];
        return $this->Reservations->save($r);
    }

    /**
     * Multiaction child
     * Effettua o revoca il check in/out di una prenotazione
     * @return boolean
     */
    protected function _mact_check($r, $params = [])
    {
        if(empty($params['type']) || !in_array($params['type'], ['in', 'out']))
            throw new WarningException("Sotto params manca 'type' ('in'/'out')");

        if(empty($params['value']))
            throw new WarningException("Sotto params manca 'value' (Date/null)");

        $r->{'data_'.$params['type']} = $params['value'];
        return $this->Reservations->save($r);
    }
}

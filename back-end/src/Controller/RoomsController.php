<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Entheos\Utils\Exception\WarningException;
use Entheos\Utils\Exception\ErrorException;

class RoomsController extends AppController
{
    /**
     * Non è una index normale con paginator, ma una funzione custom!
     *
     * @return array
     */
    public function index()
    {
        $data = $this->request->getData('data');

        $q = $this->Rooms
            ->find('all')
            ->find('occupazione', ['data' => $data])
            ->find('disponibile', ['data_da' => $data, 'data_a' => $data])
            ->contain('Structures')
            // ->groupBy('structure_id')
            ;

        $this->_setJson(true, $q->toList());
    }

    public function getDisponibilita()
    {
        $this->requireFields(['data_da', 'data_a']);
        $all = $this->Rooms->find()
            ->find('disponibile', ['data_da' => $this->request->getData('data_da'), 'data_a' => $this->request->getData('data_a'), ]);

        $this->_setJson(true, $all);
    }

    public function getDisponibilitaCampo()
    {
        $this->requireFields(['data_da', 'data_a', 'camp_id']);
        $all = $this->Rooms->find()
            ->find('structures')
            ->find('occupazione', [
                'data_da' => $this->request->getData('data_da'),
                'data_a'  => $this->request->getData('data_a'),
                'camp_id' => $this->request->getData('camp_id'),
            ]);

        $this->_setJson(true, $all);
    }

    /**
     * Imposta le stanze come prenotate
     *
     * @return array
     */
    public function prenota()
    {
        $this->requireFields(['room_ids', 'camp_id']);
        $camp = $this->Rooms->Reservations->Camps->get(null, $this->request->getData('camp_id'));
        $roomIds = $this->request->getData('room_ids');
        $rooms = [];
        foreach($roomIds as $roomId)
        {
            $rooms[] = $this->Rooms->RoomAvailabilities->newEntity([
                'camp_id' => $camp->id,
                'room_id' => $roomId,
                'data_da' => $camp->data_inizio,
                'data_a'  => $camp->data_fine,
            ]);
        }
        $this->Rooms->RoomAvailabilities->saveMany($rooms);
        $this->_setJson(true, []);
    }

    /**
     * Metodo comume per l'arricchimento della query, per funzioni view e add/edit post save
     * @param Query $query la query con già impostata la ricerca per ottenere il record
     * @return Query
     */
    public function _entityQuery($query, $id){
        return $query
            ->contain('Structures')
        ;
    }
}

<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Room extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];

    protected $_virtual = [
        'display_name',
        'disponibilita',
    ];

    protected function _getDisplayName()
    {
    	if(empty($this->structure))
    		return;
    	return $this->structure->nome.$this->numero;
    }

    protected function _getDisponibilita()
    {
        if(isset($this->room_availabilities))
            return empty($this->room_availabilities) ? 'disponibile' : 'prenotata';
        return false; // Manca il dato, non posso dirlo
    }
}

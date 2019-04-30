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
    ];

    protected function _getDisplayName()
    {
    	if(empty($this->structure))
    		return;
    	return $this->structure->nome.$this->numero;
    }
}

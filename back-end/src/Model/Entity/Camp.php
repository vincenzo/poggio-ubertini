<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Camp extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];

    protected function _getNotti()
    {
        if(empty($this->data_inizio) || empty($this->data_fine))
            return null;
        return $this->data_fine->diffInDays($this->data_inizio);
    }
}

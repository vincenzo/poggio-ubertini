<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Rate extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];

    protected function _isFixedPerRoom()
    {
        return $this->prezzo > 20;
    }
}

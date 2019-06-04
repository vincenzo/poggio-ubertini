<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class RoomAvailability extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

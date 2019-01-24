<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Reservation extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

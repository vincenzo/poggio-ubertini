<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Room extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

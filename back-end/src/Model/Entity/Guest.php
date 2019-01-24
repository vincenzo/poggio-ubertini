<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Guest extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

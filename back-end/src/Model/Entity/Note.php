<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Note extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Structure extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

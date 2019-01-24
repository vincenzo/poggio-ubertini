<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Camp extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

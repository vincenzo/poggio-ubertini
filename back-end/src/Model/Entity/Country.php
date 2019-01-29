<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Country extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

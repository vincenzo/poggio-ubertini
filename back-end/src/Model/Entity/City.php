<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class City extends Entity
{
    // use \App\Lib\ProvinceTrait;

    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}

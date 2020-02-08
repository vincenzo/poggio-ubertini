<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

class Guest extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];

    protected $_virtual = [
        'nome_cognome'
    ];

    protected function _getNomeCognome()
    {
        return $this->nome . ' ' . $this->cognome;
    }
}

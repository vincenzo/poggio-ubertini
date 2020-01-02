<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\I18n\FrozenDate;

class Reservation extends Entity
{
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];

    public function getGiorniImpostaSoggiorno(FrozenDate $dataInizio, FrozenDate $dataFine)
    {
        $inizio = $this->data_in < $dataInizio ? $dataInizio : $this->data_in;
        $fine = $this->data_out > $dataFine || !$this->data_out ? $dataFine : $this->data_out;
        $gg = $fine->diffInDays($inizio);
        return $gg > 6 ? 6 : $gg;
    }
}

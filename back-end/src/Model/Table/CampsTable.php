<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\Table;
use Cake\Event\Event;
use Cake\Core\Configure;
use App\Model\Entity\Camp;
use Cake\ORM\RulesChecker;
use Cake\ORM\TableRegistry;
use Cake\Validation\Validator;
use Cake\Collection\Collection;
use Cake\Database\Schema\TableSchema;
use Entheos\Utils\Exception\WarningException;

class CampsTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('camps');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('Reservations', [
            'dependent' => true,
        ]);

        $this->hasOne('UploadIpotesiSpesa', [
            'className' => 'Uploads',
            'conditions' => ['categoria' => 'ipotesi_spesa', 'model_name' => 'Camps'],
            'foreignKey' => 'model_id'
        ]);

        $this->addBehavior('Timestamp');
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        return $validator;
    }

    protected function _initializeSchema(TableSchema $schema)
    {
        $schema->setColumnType('contatori', 'json');
        $schema->setColumnType('consuntivo', 'json');
        return $schema;
    }
    
    public function beforeSave(Event $event, Camp $entity, \ArrayObject $options)
    {
        if($entity->chiuso == true && $entity->isDirty('chiuso')) {
            $this->consuntivo = $this->generaConsuntivo($entity);
        }
        return true;
    }

    // TODO
    public function generaConsuntivo($e)
    {
        $this->camp = $e;
        $this->costi = [
            'stanze' => [], // Organizzato per "DMY + RATE ID + CAT" => [ospiti, prezzo]
            'totali_stanze' => [
                'centro' => 0,
                'locali' => 0,
            ],
            'contatori' => [],
            
        ];
        $this->__findGroupedReservations();
        $this->__findCampRates();
        $this->__calcRoomsRate();
        $this->__calcContatori();
        // OK tariffa stanze fixed
        // OK tariffa stanze variabili
        // lenzuola
        // contatori
        debug($this->costi);
        return [];
    }

    private function __findGroupedReservations()
    {
        $this->resData = $this->Reservations->find()
            ->where(['camp_id' => $this->camp->id])
            ->order(['data_in' => 'ASC'])
            ->contain(['Guests', 'Rooms'])
            ->groupBy('room_id')
        ;
    }

    private function __findCampRates()
    {
        $this->campRates = TableRegistry::get('Rates')->find()
            ->where([
                'data_da <=' => $this->camp->data_inizio,
                'OR' => [
                    'data_a >=' => $this->camp->data_fine,
                    'data_a IS' => null
                ]
            ])
        ;
    }

    private function __calcRoomsRate()
    {
        $this->costi['stanze'] = [];
        $verbose = false;

        foreach($this->resData as $roomId => $reservations) {
            $prezzo = 0;
            // Cerca la tariffa per la stanza (fissa)
            $roomRate = $this->campRates->filter(function ($rate) use ($roomId) {
                return $rate->room_id == $roomId;
            })->first();
            
            
            if(!empty($roomRate)) {
                // Tariffa fissa per stanza (indipendentemente da quante persone)
                $occupancy = $this->__calcRoomOccupancyOverNights($reservations);
                foreach($occupancy as $dmy => $detail) {
                    $prezzo = $roomRate->prezzo;
                    $locali = $detail['adulti'] + $detail['ragazzi'];
                    if(!$locali)
                        continue;
                    $this->__pushDateCatRateData($dmy, 'locali', $roomRate->id, $locali, $prezzo);
                    $this->costi['totali_stanze']['locali'] += $prezzo;
                }
            } else {
                // Tariffa variabile per notte a persona
                foreach($reservations as $res) {
                    $roomRate = $this->campRates->filter(function ($rate) use ($res) {
                        return $rate->structure_id == $res->room->structure_id && $rate->notti == ($res->notti < GG_MAX_RATE ? $res->notti : GG_MAX_RATE);
                    })->first();

                    // Devo calcolarla per ogni stanza per spalmare il costo che già conosco nel dettaglio giornaliero
                    $occupancy = $this->__calcRoomOccupancyOverNights( [$res] );
                    $prezzo = $res->isGuestUnder16 ? $roomRate->prezzo_u16 : $roomRate->prezzo;
                    foreach($occupancy as $dmy => $detail) {
                        foreach(['adulti', 'ragazzi'] as $k) {
                            if(!empty($detail[$k])) {
                                $this->__pushDateCatRateData($dmy, $k, $roomRate->id, 1, $prezzo);
                            }
                            $this->costi['totali_stanze']['centro'] += $prezzo;
                        }
                    }
                }
            }
        }
        ksort($this->costi['stanze']);
        // if($verbose) debug(sprintf("totale %d", $this->costi['stanze']));
    }

    private function __pushDateCatRateData($date, $cat, $rateId, $guests, $price)
    {
        $idx = "$date+$cat+$rateId";
        if(empty($this->costi['stanze'][$idx]))
            $this->costi['stanze'][$idx] = ['ospiti' => 0, 'importo' => 0];
        $this->costi['stanze'][$idx]['importo'] += $price;
        $this->costi['stanze'][$idx]['ospiti'] += $guests;
    }

    private function __calcRoomOccupancyOverNights($reservations)
    {
        if(empty($this->camp->data_fine))
            throw new WarningException("Manca la data fine campo, non posso calcolare il consuntivo");

        $d = $this->camp->data_inizio;
        $days = [];

        do {
            $resForDay = (new Collection($reservations))->filter(function($r) use ($d) {
                return $r->data_in <= $d && $r->data_out >= $d->addDays(1);
            });
            $countAdulti = $resForDay->filter(function($r) { return !$r->isGuestUnder16; })->count();
            $countUnder16 = $resForDay->filter(function($r) { return $r->isGuestUnder16; })->count();
            $days[$d->format('d-m-Y')] = [
                'adulti' => $countAdulti,
                'ragazzi' => $countUnder16,
            ];
            $d = $d->addDays(1);
        } while($d <= $this->camp->data_fine);
        return $days;
    }

    private function __calcContatori()
    {
        $cont = $this->camp->contatori;
        $totale = 0; 
        foreach($cont as $k => $c) {
            $c['tariffa'] = Configure::read('Lookup.Camps.contatori_costo.'.$k, 0);
            $c['diff'] = $c['uscita'] - $c['ingresso'];
            if($c['diff'] < 0)
                throw new WarningException("C'è un errore nei valori del contatore $k: uscita è minore di ingresso!");
            $c['prezzo'] = $c['diff'] * $c['tariffa'];
            $totale += $c['prezzo'];
            $cont[$k] = $c;
        }

        $cont['fixed_EL'] = $this->camp->notti * Configure::read('Lookup.Camps.contatori_costo.fixed_EL');
        $totale += $cont['fixed_EL'];
        $this->costi['contatori'] = $cont + ['totale' => $totale];
    }

}

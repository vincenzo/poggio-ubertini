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
    use \Entheos\Utils\Lib\IncrementalTrait;

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('camps');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('Reservations', [
            'dependent' => true,
        ]);

        $this->belongsTo('Capogruppo', [
            'className' => 'Guests',
            'foreignKey' => 'capogruppo_id',
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
        if($entity->isNew()) {
            if(empty($entity->n_scheda)) {
                $entity->n_scheda = $this->getIncremental(['YEAR(created)' => date('Y')], 'n_scheda');
            }
        }
        return true;
    }

    public function generaConsuntivo($e)
    {
        $this->camp = $e;
        $this->costi = [
            'stanze' => [], // Organizzato per "DMY + CAT + RATE ID" => [ospiti, prezzo]
            'totali_stanze' => [
                'centro' => 0,
                'locali' => 0,
            ],
            'contatori' => [],
            'biancheria' => [],
            
        ];
        $this->__findGroupedReservations();
        $this->__findCampRates();
        $this->__calcRoomsRate();
        $this->__expandRoomsDetails();
        $this->__calcContatori();
        $this->__calcBiancheria();
        // debug($this->costi);
        return $this->costi;
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
        $this->costi['totali_stanze']['totale'] = $this->costi['totali_stanze']['centro'] + $this->costi['totali_stanze']['locali'];
        // if($verbose) debug(sprintf("totale %d", $this->costi['stanze']));
    }

    private function __expandRoomsDetails()
    {
        foreach($this->costi['stanze'] as $k => $r) {
            $details = explode('+', $k);
            $this->costi['stanze'][$k] = $r + [
                'data' => $details[0],
                'cat'  => $details[1],
            ];
        }
        // Resetta le chiavi per evitare problemi di sort in front
        ksort($this->costi['stanze']);
        $this->costi['stanze'] = array_values($this->costi['stanze']);
    }

    private function __pushDateCatRateData($date, $cat, $rateId, $guests, $price)
    {
        $idx = "$date+$cat+$rateId";
        if(empty($this->costi['stanze'][$idx]))
            $this->costi['stanze'][$idx] = ['ospiti' => 0, 'quota' => $price, 'totale' => 0];
        $this->costi['stanze'][$idx]['totale'] += $price;
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
        if(empty($cont))
            throw new WarningException("Dati contatori mancanti");
            
        foreach($cont as $k => $c) {
            if(!isset($c['ingresso']) || !isset($c['uscita']))
                throw new WarningException("Dati contatori incompleti");
                
            $c['tariffa'] = Configure::read('Lookup.Camps.contatori_costo.'.$k, 0);
            $c['diff'] = $c['uscita'] - $c['ingresso'];
            if($c['diff'] < 0)
                throw new WarningException("C'è un errore nei valori del contatore $k: uscita è minore di ingresso!");
            $c['prezzo'] = $c['diff'] * $c['tariffa'];
            $totale += $c['prezzo'];
            $cont[$k] = $c;
        }

        $cont['fixed_EL'] = [
            'tariffa' => Configure::read('Lookup.Camps.contatori_costo.fixed_EL'),
            'notti' => $this->camp->notti,
            'prezzo' => $this->camp->notti * Configure::read('Lookup.Camps.contatori_costo.fixed_EL')
        ];
        $totale += $cont['fixed_EL']['prezzo'];
        $this->costi['contatori'] = $cont + ['totale' => $totale];
    }

    private function __calcBiancheria()
    {
        $totale = 0;
        $res = [];
        $fields = ['lenzuola_singole', 'lenzuola_doppie', 'asciugamani'];
        foreach($fields as $field) {
            $t = Configure::read('Lookup.Camps.costi_extra.'.$field);
            $tot = $t * $this->camp->{$field};
            $res[$field] = [
                'n' => $this->camp->{$field},
                'tariffa' => $t,
                'totale' => $tot,
            ];
            $totale += $tot;
        }
        $res['totale'] = $totale;
        $this->costi['biancheria'] = $res;
    }

}

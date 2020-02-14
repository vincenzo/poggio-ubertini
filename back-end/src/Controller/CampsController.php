<?php
namespace App\Controller;

use Cake\I18n\Time;
use Cake\Event\Event;
use App\Controller\AppController;
use Entheos\Utils\Exception\ErrorException;
use Entheos\Utils\Exception\WarningException;

class CampsController extends AppController
{
    public $paginate = [
        'page' => 1,
        'limit' => 25,
        'maxLimit' => 250,
        'fields' => [
            'id', 'n_scheda', 'data_scheda', 'capogruppo_id', 'nome', 'data_inizio', 'data_fine', 'tipo', 'effettivo', 'chiuso', 'created',
        ],
        'sortWhitelist' => [
            'id',
        ],
        'order'  => ['id' => 'DESC'],
    ];

    public $filterWhitelist = [
        'Camps' => [
            'effettivo' => 'boolean',
            'chiuso' => 'boolean',
        ],
    ];

    public function index()
    {
        $q = $this->Camps
            ->find('all')
            ->contain(['Capogruppo' => function($q) {
                return $q->select(['nome', 'cognome']);   
            }])
            ;

        $this->filterPaginate($q);
    }

    public function addManyGuests()
    {
        ini_set('memory_limit', '300M');
        $this->requireFields(['camp_id', 'file']);
        if($this->request->getData('file.error') != 0)
            throw new WarningException("Errore nel caricamento del file");

        $registry = \Robotusers\Excel\Registry::instance();
        $table = $registry->get($this->request->getData('file.tmp_name'), null, [
            'startRow' => 3,
            'columnTypeMap' => [
                'F' => 'date',
                'O' => 'date',
                'P' => 'date',
            ]
        ]);

        $all = $table->find();
        $ret = [];

        $upTrim = function($t) { return trim(strtoupper($t)); };
        $formatDate = function($str) { return $str ? Time::createFromFormat('d/m/Y', $str) : null; };

        $reservations = [];
        foreach ($all as $r) {
            $data = [
                'camp_id' => $this->request->getData('camp_id'),
                'guest' => [
                    'cittadinanza_italiana' => $upTrim($r['A']) == "SI",
                    'cognome' => $r['B'],
                    'nome' => $r['C'],
                    'genere' => $upTrim($r['D']) == 'M' ? 'M' : 'F',
                    'codice_fiscale' => $upTrim($r['E']),
                    'data_nascita' => $r['F'],
                    'citta_nascita' => $r['G'],
                    'nazione_nascita' => $upTrim($r['H']),
                    'indirizzo' => $r['I'],
                    'cap' => $r['J'],
                    'citta' => $r['K'],
                    'provincia' => $r['L'],
                    'nazione' => $r['M'],
                    'documento_tipo' => 'PAS',
                    'documento_numero' => $r['N'],
                    'documento_data_rilascio' => $r['O'],
                    'documento_data_scadenza' => $r['P'],
                    'disabile' => $upTrim($r['Q']) == "SI",
                    'note' => $r['R']
                ]
            ];

            $reservations[] = $this->Camps->Reservations->newEntity($data);
            // logd($data);
        }

        $this->Camps->Reservations->saveMany($reservations);
        $this->_setJson(true, []);
    }

    public function chiudi()
    {
        $r = $this->Camps->get($this->request->getData('id'));
        $r->chiuso = true;
        $r->consuntivo = $this->Camps->generaConsuntivo($r);
        $r->setDirty('consuntivo', true);
        $this->Camps->save($r);
        $this->_setJson(true, true);
    }

    /**
     * Metodo comume per l'arricchimento della query, per funzioni view e add/edit post save
     * @param Query $query la query con già impostata la ricerca per ottenere il record
     * @return Query
     */
    public function _entityQuery($query, $id){
        return $query
            ->contain([
                'Reservations.Rooms',
                'Reservations.Rooms.Structures',
                'Reservations',
                'Reservations.Guests' => function($q) { return $q->order(['capogruppo' => 'DESC']); },
                'Capogruppo',
                'UploadIpotesiSpesa',
                'Documenti'
            ]);
    }
    

}

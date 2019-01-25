<?php

namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;

class AppController extends Controller
{

    use \Crud\Controller\ControllerTrait;
    use \Entheos\Utils\Lib\CrudBasicTrait;
    use \Entheos\Utils\Lib\FilterTrait;
    use \Entheos\Utils\Lib\CorsTrait;

    public $components = [
        'RequestHandler',
        'Flash',
    ];

    public function initialize()
    {
        parent::initialize();

        $this->loadComponent('Crud.Crud', [
            'actions' => [
                'Crud.Index',
                'Crud.View',
                'Crud.Add',
                'Crud.Edit',
                'Crud.Delete'
            ],
            'listeners' => [
                'Crud.Api',
                'Crud.ApiPagination',
                // 'Crud.ApiQueryLog'
            ]
        ]);

        $this->loadComponent('Auth', [
            'storage' => 'Memory',
            'authenticate' => [
                'ADmad/JwtAuth.Jwt' => [
                    'userModel' => 'Users',
                    'fields' => [
                        'username' => 'id'
                    ],
                    'parameter' => 'token',
                    'queryDatasource' => true,
                ]
            ],
            'authorize' => ['Controller'],
            'unauthorizedRedirect' => false,
            'checkAuthIn' => 'Controller.initialize',
        ]);

        $this->loadComponent('Utils.Authorizer', ['roleField' => 'role']);
        $this->loadComponent('Utils.GlobalAuth');

        $this->Auth->allow(['welcome']);

        $this->setCorsHeaders();
        setlocale(LC_TIME, 'it_IT.UTF-8');
    }

    /**
     * L'autorizzazione segue il principio del default deny
     * L'app controller autorizza le chiamate effettuate da admin, mentre quelle per gli altri gruppi
     * sono verificate dai singoli controller
     *
     * isAuthorized da implementare su controller:
     *
     * public function isAuthorized($user)
     * {
     *     $this->Authorizer->action(['index'], function($auth) {
     *         $auth->allowRole(['officina']);
     *     });
     *
     *     return $this->Authorizer->authorize() || parent::isAuthorized($user);
     * }
     *
     * @param  array  $user
     * @return boolean
     */
    public function isAuthorized($user)
    {
        // Admin can access every action
        if (!empty($user['role']))
        {
            if($user['role'] === 'admin')
                return true;
        }

        // Default deny
        return false;
    }

    public function beforeFilter(Event $event)
    {
        $this->request->addDetector(
            'static_file',
            function ($request) {
                $ext = pathinfo(strtolower($request->getPath()), PATHINFO_EXTENSION);
                return $request->getHeader('accept') == 'application/pdf' || in_array($ext, \Cake\Core\Configure::read('Extensions'));
            }
        );

        if(!$this->request->is('json') && !$this->request->is('static_file'))
            die('Only JSON allowed here.');
    }

    /**
     * Recupera la configurazione delle lookup da condividere col front
     * @return array
     */
    public function getConfig()
    {
        $companyId = $this->request->getData('company_id');
        if(empty($companyId))
            $companyId = 1;

        $data = [
            'Intestazione' => \Cake\Core\Configure::read('Intestazione'),
            'Lookup' => \Cake\Core\Configure::read('Lookup'),
        ];

        $data['Lookup']['Items'] = \Cake\ORM\TableRegistry::get('Items')->find('all')
            ->where(['company_id' => $companyId])
            ->order(['ordine' => 'ASC', 'descrizione' => 'ASC'])
            ->groupBy('item_category_id');

        $data['Lookup']['Companies'] = \Cake\ORM\TableRegistry::get('Companies')->find('all');
        
        $data['Lookup']['Banks'] = \Cake\ORM\TableRegistry::get('Banks')->find('all')
            ->where(['company_id' => $companyId])
            ->order(['codice' => 'ASC'])
            ->formatResults(function ($results){
                return $results->map(function ($row) {
                    return ['value' => $row->id, 'name' => $row->codice_nome_lookup];
                });
            });

        $data['Lookup']['Competenze']['list'] = \Cake\ORM\TableRegistry::get('Items')->find('all')
            ->where(['item_category_id' => 2])
            ->where(['company_id' => $companyId])
            ->select(['value' => 'id', 'name' => 'descrizione'])
            ->order(['ordine' => 'ASC']);

            $data['Lookup']['Certificazioni']['list'] = \Cake\ORM\TableRegistry::get('Items')->find('all')
            ->where(['item_category_id' => 1])
            ->where(['company_id' => $companyId])
            ->select(['value' => 'id', 'name' => 'descrizione'])
            ->order(['ordine' => 'ASC']);

        $data['Lookup']['Tobaccos']['list'] = \Cake\ORM\TableRegistry::get('Tobaccos')->find('all')
            ->where(['attivo' => true])
            ->select(['value' => 'id', 'name' => 'nome', 'codice'])
            ->order(['nome' => 'ASC']);

        $years = [];
        for($i = 2017; $i <= date('Y') + 1; $i++) $years[$i] = $i;
        $data['Lookup']['Years']['list'] = $years;


        $data['Lookup'] = $this->all2nv($data['Lookup'], [
            'BuyDocuments'      => [ 'pagato_via', 'tipo' ],
            'Clients'           => [ 'tipo', 'pagamento_mod' ],
            'Contacts'          => [ 'list' ],
            'Ddts'              => [ 'mittenti', ],
            'IDs'               => [ 'list', ],
            'Months'            => [ 'list', ],
            'Years'             => [ 'list', ],
            'Invoices'          => [ 'tipo', 'pagamento_mezzo' ],
            'EmployeeContracts' => [ 'tipo_contratto', 'mansione' ],
            'QuoteItems'        => [ 'porzione', 'stagioni', 'tipo', 'tipologia_food', 'tipo_costo', 'categoria_food' ],
            'Quotes'            => [ 'sede', 'tipo_evento', 'tipo_servizio' ],
            'Products'          => [ 'categoria', 'unita' ],
            'Sesso'             => [ 'list' ],
            'Users'             => [ 'roles' ],
            'VatRates'          => [ 'list' ],
        ]);

        $data['Lookup']['QuoteItems']['items_noleggio'] = \Cake\ORM\TableRegistry::get('QuoteItems')->find('all')
            ->where(['attivo' => true, 'tipo' => 'NOL'])
            ->select(['value' => 'id', 'name' => 'descrizione'])
            ->order(['ordine' => 'ASC']);

        $this->_setJson(true, $data);
    }


    private function all2nv($a, $keys)
    {
        foreach($keys as $k1=>$v1)
        {
            foreach($v1 as $k2){
                $this->kv2nv($a[$k1][$k2]);
            }
        }
        return $a;
    }

    private function kv2nv(&$a){
        $a = array_map(function($k, $v){ return ['value' => $k, 'name' => $v]; }, array_keys($a), $a);
    }

    /**
     * API entry point (url /)
     * @return void
     */
    public function welcome()
    {
        die("Welcome!");
    }

}
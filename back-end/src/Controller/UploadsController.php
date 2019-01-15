<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use App\Lib\UploaderTrait;
use App\Lib\PresignedUrlTrait;

use Cake\Network\Exception\BadRequestException;
use Cake\Network\Exception\NotFoundException;

class UploadsController extends AppController
{
    use UploaderTrait;
    use PresignedUrlTrait;

    public $paginate = [
        'page' => 1,
        'limit' => 25,
        'maxLimit' => 500,
        'fields' => [
            'id', 'data', 'file_name', 'file_type', 'created',
        ],
        'sortWhitelist' => [
            'id', 'descrizione', 'created',
        ],
        'order' => ['id' => 'DESC'],
    ];

    public $filterWhitelist = [
        'Uploads' => [
            'id'          => 'integer',
            'user_id'     => 'integer',
            'y'           => 'integer',
            'tipo'        => 'string',
            'descrizione' => 'like',
            'filename'    => 'like',
            'note'        => 'like',
        ],
    ];

    public function initialize()
    {
        parent::initialize();
        $this->Auth->allow(['attachment', 'preview']);
    }

    /**
     * Chiamata POST
     * Se user, filtra per il suo ID, recuperandolo da token
     * Se admin, filtra solo se viene passato user_id in POST,
     * altrimenti restituisce tutti i risultati con in aggiunta i dati dello user
     */
    public function index()
    {
        $this->requirePost();

        $data = \Cake\Utility\Hash::flatten($this->request->getData());

        if(empty($data['Uploads.y']))
            throw new BadRequestException('L\'anno è obbligatorio');

        $q = $this->Uploads
            ->find('all')
        ;

        $this->filterPaginate($q);
    }

    /**
     * ADD EDIT CRUD
     * Per dettagli vedi la documentazione della Entity Document
     * @return void
     */
    public function add()
    {
        throw new \Exception("Chiama la funzione upload!");
    }

    /**
     * Allega un file a un record esistente
     * Accetta in post 'id' e 'file'
     * @return void
     */
    public function upload()
    {
        $this->requireFields(['model_id', 'model_name']);
        $this->validateUpload('file');

        // if($this->request->getData('categoria') != 'RENTER')
        //     $this->requireFields(['client_id']);

        $r = $this->Uploads->newEntity($this->request->getData());

        $r->generateFileDir();
        $r->generateFileName(!empty($_FILES['file']['name']) ? $_FILES['file']['name'] : '', $this->request->getData('suffisso'));

        if($this->moveUploadedFile('file', $r->getFullPath()))
        {
            $r->file_type = $this->uploadType;
            $this->Uploads->save($r);
        }

        $this->_setJson(true, $r);
    }

    /**
     * Restituisce il documento allegato
     * L'autenticazione per questa funzione è sbloccata e il controllo viene fatto sull'url presigned
     * Chiunque abbia quell'url per la sua durata può accedere al documento in quanto
     * non c'è controllo su chi è l'utente che lo richiede
     *
     * @param  string $filename Il primo blocco del filename contiene l'id dell'utente "id-nomefile"
     * @return Resource
     */
    public function attachment($id, $urlExpiration, $token, $filename)
    {
        $this->validatePresignedUrl(\Cake\Routing\Router::fullBaseUrl().'api'.$this->request->getRequestTarget(), $urlExpiration, $token);

        $r = $this->Uploads->findById((int)$id)->first();

        if(empty($r))
            throw new NotFoundException("File non trovato");

        $response = $this->response->withFile($r->getFullPath(), ['name' => $r->public_filename, 'download' => true]);
        return $response;
    }

    /**
     * Restituisce il file dell'anteprima upload
     * @param  int $id
     * @return Resource
     */
    public function preview($id, $urlExpiration, $token, $filename)
    {
        $this->validatePresignedUrl(\Cake\Routing\Router::fullBaseUrl().'api'.$this->request->getRequestTarget(), $urlExpiration, $token);
        
        $r = $this->Uploads->findById((int)$id)->first();

        if(empty($r))
            throw new NotFoundException("File non trovato");

        $response = $this->response->withFile($r->getPreviewsFullPath());
        return $response;
    }

    /**
     * Rimuove il file allegato dal documento
     * Accetta in post l'id del documento
     * @return void
     */
    public function removeAttachment()
    {
        $this->requireFields(['id']);

        $r = $this->Uploads->get($this->request->getData('id'));

        if($this->Uploads->deleteAttachment($r))
        {
            $r->file_name = '';
            $r->file_type = '';
            $r->file_dir  = '';
            $this->Uploads->save($r);
        }

        $this->_setJson(true, $r);
    }

    /**
     * Estrae l'ID dalla prima parte del file_name
     * @param  string $filename Il primo blocco del filename contiene l'id dell'utente "id-nomefile"
     * @return int
     */
    private function __extractIdFromFilename($filename)
    {
        $tmp = explode('-', $filename);
        return (int)$tmp[0];
    }

}

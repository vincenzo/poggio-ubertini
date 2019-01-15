<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use App\Lib\PresignedUrlTrait;
use Cake\Utility\Inflector;
use Intervention\Image\ImageManagerStatic as Image;
use Entheos\Utils\Exception\ErrorException;

/**
 *
 * - categoria designa la macro categoria di documento (es. OFFERTA)
 * - tipo designa la tipologia di documento caricato (es. Offerta noleggiatore, che è un doc specifico nella categoria OFFERTA)
 * - model_name e model_id sono il riferimento esatto al model (es. Clients, 1)
 * - descrizione è un valore libero inserito dall'utente
 * - extra_data sono brevi dati serializzati (varchar 255)
 * - file_name è il nome del file
 * - file_dir è la path relativa all'interno della cartella di uploads, SENZA slash finale
 * - file_type traccia il mime type del file
 *
 * I documenti sono organizzati in sottocartelle per model/anno/mese
 *
 */
class Upload extends Entity
{
    use PresignedUrlTrait;

    protected $_accessible = [
        '*' => true,
        'id' => false
    ];

    protected $_virtual = [
        'public_filename',
        'presigned_url',
        'preview_url',
    ];

    /**
     * Restituisce la path relativa all'interno di uploads
     *
     * Gli upload sono organizzati su base:
     * - model ID (quando multipli per model)
     * - anno/mese quando sono 1 per id
     *
     * Quando gestisci un tipo nuovo chiediti se funzionano come
     * - le fatture (1 doc allegato per record, quindi ha senso che sia un file per id,
     * quindi potrebbero stare in un'unica cartella, e li dividiamo solo per non avere una cartella con 3000 file)
     * - oppure se ha senso che stiano tutti sotto lo stesso Id di model, divisi per categoria
     * (es. tutti i documenti caricati per un dipendente, le buste paga, certificazioni)
     * @return string
     */
    public function generateFileDir()
    {
        $folderName = [
            'EmployeeContracts' => 'Contratti',
            'EmployeeCus'       => 'CU',
            'EmployeeDocuments' => 'Documenti',
            'EmployeePaychecks' => 'BustePaga',
            'EmployeesCerts'    => 'Certificazioni',
        ];

        switch($this->model_name)
        {
            case 'BuyDocuments':
                $this->file_dir = 'DocumentiAcquisto' . DS . date('Y') . DS . date('m');
                break;
            case 'Invoices':
                $this->file_dir = 'Fatture' . DS . date('Y') . DS . date('m');
                break;
            case 'EmployeeContracts':
            case 'EmployeeCus':
            case 'EmployeeDocuments':
            case 'EmployeePaychecks':
            case 'EmployeesCerts':
                if(empty($this->extra_data['employee_id']))
                    throw new ErrorException("Non ho l'employee id in extra data");

                $this->file_dir = 'Dipendenti' . DS . $this->extra_data['employee_id'] . DS . $folderName[$this->model_name];
                break;
            default:
                throw new ErrorException("Gestisci questo model in UploadEntity->generateFileDir!");
        }
    }

    /**
     * Genera il nome file a seconda del documento creato
     * @return string
     */
    public function generateFileName($oldName)
    {
        $pinfo = pathinfo($oldName);
        $this->estensione = strtolower($pinfo['extension']);

        if($this->model_name[0] == 'E')
        {
            $contain = array_merge(['Employees'], ($this->model_name == 'EmployeesCerts' ? ['Items'] : []));
            $e = \Cake\ORM\TableRegistry::get($this->model_name)->findById($this->model_id)->contain($contain)->first();
            $now = date('Y-m-d');
            $dipendente = $e->employee->cognome_nome;
        }

        switch($this->model_name)
        {
            case 'BuyDocuments':
                $this->base_name = $pinfo['filename'];
                break;
            case 'Invoices':
                $this->base_name = $pinfo['filename'];
                break;
            case 'EmployeeContracts':
                $this->base_name = sprintf("Contratto %s %s %s", $e->tipo_contratto, $dipendente, $now);
                break;
            case 'EmployeeCus':
                $this->base_name = sprintf("UNICO %d %s", $e->y, $dipendente);
                break;
            case 'EmployeeDocuments':
                $this->base_name = sprintf("%s %s", $e->tipo, $dipendente);
                break;
            case 'EmployeePaychecks':
                $this->base_name = sprintf("BP %s %d-%s", $dipendente, $e->y, $e->mese);
                break;
            case 'EmployeesCerts':
                $this->base_name = sprintf("%s %s %s", $e->item->descrizione, $dipendente, $e->data->format('Y-m-d'));
                break;
            default:
                throw new ErrorException("Gestisci questo model in UploadEntity->generateFileName!");
        }
        $this->generateUniqueFileName();

    }

    public function getRelativePath()
    {
        return $this->file_dir . DS;
    }

    public function generateUniqueFileName()
    {
        $this->file_name = sprintf("%s%s%s.%s",
            $this->base_name,
            ($this->is_archiviato  ? '-ar'.$this->data_archiviato->format('Ymd')  : ''),
            ($this->suffisso_auto ? '-'.$this->suffisso_auto : ''),
            $this->estensione
        );
        $this->ensureFilenameIsUnique();
    }

    protected function _getPublicFilename()
    {
        return sprintf("%s.%s",
            $this->base_name,
            $this->estensione
        );
    }

    /**
     * Restituisce il percorso completo del file su disco
     * @param  string $filename Permette di ottenere il percorso del file precedente che è stato rimpiazzato dal nuovo
     * @return string
     */
    public function getFullPath($filename = null)
    {
        if(empty($filename))
            $filename = $this->file_name;

        if(empty($this->file_dir))
            $this->file_dir = $this->generateFileDir();

        return WWW_ROOT . UPLOADS_DIR . DS . $this->getRelativePath() . $filename;
    }

    /**
     * Restituisce la cartella delle anteprime per il cliente
     * @param  boolean $createIfNotExists 
     * @return string
     */
    public function getPreviewsDir($createIfNotExists = false)
    {
        $migliaio = ceil($this->id / 500);
        $dir = WWW_ROOT . UPLOADS_DIR . DS . PREVIEWS_DIR . DS . $migliaio;
        
        if($createIfNotExists)
            $this->makeDir($dir);
        return $dir;
    }

    public function getPreviewsFullPath()
    {
        return $this->getPreviewsDir() . DS . $this->id . '.jpg';
    }

    /**
     * Crea l'anteprima per il file caricato e la salva nella cartella comune all'interno della folder del cliente
     * Il nome del file è l'ID upload .jpg
     * @return void 
     */
    public function generatePreview($overwrite = false)
    {
        Image::configure(array('driver' => 'imagick'));
        $previewName = $this->getPreviewsDir(true) . DS . $this->id . '.jpg';

        if(file_exists($previewName) && !$overwrite)
            return true;

        $img = Image::make($this->getFullPath());
        return $img
            ->resize(null, 1200, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })
            ->save($previewName, 85);
    }

    protected function _getPreviewUrl()
    {
        return $this->createPresignedUrl(\Cake\Routing\Router::fullBaseUrl().'api/uploads/preview/'.$this->id, $this->id . '.jpg');
    }

    /**
     * Controlla che il nome del file sia unico
     * @return bool
     */
    public function ensureFilenameIsUnique()
    {
        $fullPath = $this->getFullPath();
        if(!file_exists($fullPath))
            return true;

        $this->suffisso_auto = $this->__shMd5(time(), 5);
        $this->generateUniqueFileName();
    }


    /**
     * Sposta un file, assicurandosi che la dir di destinazione esiste, altrimenti la crea
     * @param  string $origin      
     * @param  string $destination 
     * @return bool
     */
    public function moveFile($origin, $destination)
    {
        $pathinfo = pathinfo($destination);

        $this->makeDir($pathinfo['dirname']);

        $res = @rename($origin, $destination);
        return $res;
    }

    /** 
     * Crea una cartella se non esiste
     * Usa umask per assicurarsi di dare i giusti permessi di RW alla cartella per
     * owner e group, altrimenti www-data porebbe non dare permessi gruppo e altri utenti
     * non sarebbero in grado di modificare il file caricato (ad esempio processi lanciati da cronjobs)
     * @param  string $path 
     * @return void
     */
    public function makeDir($path)
    {
         if(!is_dir($path))
         {
            $old = umask(0);
            mkdir($path, 0775, true);
            umask($old);
         }
         return true;
    }

    private function __shMd5($t, $len = 10)
    {
        $salt = "HASDA43/%43FF";
        return substr(md5($t.$salt), 0, $len);
    }

    protected function _getPresignedUrl()
    {
        return $this->createPresignedUrl(\Cake\Routing\Router::fullBaseUrl().'api/uploads/attachment/'.$this->id, $this->file_name);
    }
}

<?php
namespace App\Lib;

use Cake\Network\Exception\BadRequestException;

trait UploaderTrait
{
	public $uploadExt = '';
	public $uploadType = '';
	public $uploadFilename = '';
	public $acceptedFileTypes = [
		'jpg'	=> 'image/jpeg',
		'png'	=> 'image/png',
		'gif'	=> 'image/gif',
		'pdf'	=> 'application/pdf',
		'zip'	=> 'application/zip',
		'rar'	=> 'application/x-rar',
		'doc'	=> 'application/msword',
		'docx'	=> 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'xls'	=> 'application/vnd.ms-excel',
		'xlsx'	=> 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

	public $categoryFileTypes = [
		'jpg'	=> 'image',
		'png'	=> 'image',
		'gif'	=> 'image',
		'pdf'	=> 'pdf',
		'zip'	=> 'archive',
		'rar'	=> 'archive',
		'doc'	=> 'document',
		'docx'	=> 'document',
		'xls'	=> 'document',
		'xlsx'	=> 'document',
    ];

    public function validateUpload($idx)
    {
    	// Undefined | Multiple Files | $_FILES Corruption Attack
    	// If this request falls under any of them, treat it invalid.
    	if (
    	    !isset($_FILES[$idx]['error']) ||
    	    is_array($_FILES[$idx]['error'])
    	) {
    	    throw new BadRequestException('File non presente');
    	}

    	// Check $_FILES[$idx]['error'] value.
    	switch ($_FILES[$idx]['error']) {
    	    case UPLOAD_ERR_OK:
    	        break;
    	    case UPLOAD_ERR_NO_FILE:
    	        throw new BadRequestException('Nessun file inviato');
    	    case UPLOAD_ERR_INI_SIZE:
    	    case UPLOAD_ERR_FORM_SIZE:
    	        throw new BadRequestException('La dimensione del file supera la massima consentita');
    	    default:
    	        throw new BadRequestException('Errore sconosciuto');
    	}

    	// You should also check filesize here. 
    	if ($_FILES[$idx]['size'] > 50 * 1024 * 1024) {
    	    throw new BadRequestException('La dimensione del file supera la massima consentita');
    	}

    	// DO NOT TRUST $_FILES[$idx]['mime'] VALUE !!
    	// Check MIME Type by yourself.
    	$file = new \Cake\Filesystem\File($_FILES[$idx]['tmp_name'], false);
    	$mime = $file->mime();
    	if (false === $this->uploadExt = array_search(
    	    strtolower($mime),
    	    $this->acceptedFileTypes,
    	    true
    	)) {
    	    throw new BadRequestException('Formato di file non corretto');
    	}
    }

	/**
	 * Sposta un file uploadato, dopo avere effettuato dei check di sicurezza
	 * @param  string $idx  indice sotto cui è stato caricato il file
	 * @param  string $path percorso completo del file, relativo alla WWW_ROOT
	 * @param  int $id   id dell'entity (opzionale)
	 * @return bool
	 */
	public function moveUploadedFile($idx, $fullPath)
	{
	    $this->uploadType = $this->categoryFileTypes[$this->uploadExt];

	    $this->makeDir(pathinfo($fullPath, PATHINFO_DIRNAME));

	    if (!move_uploaded_file($_FILES[$idx]['tmp_name'], $fullPath)) {
	        throw new \RuntimeException('Errore durante lo spostamento del file');
	    }

	    return true;
	}

	/** 
	 * Crea una cartella se non esiste
	 * @param  string $path 
	 * @return void
	 */
	function makeDir($path)
	{
	     return is_dir($path) || mkdir($path, 0755, true);
	}

}
<?php
namespace App\Lib;

use Cake\Http\Exception\BadRequestException;
/**
 * Gestisce la creazione e la verifica di url presigned
 */
trait PresignedUrlTrait
{

	/**
	 * A partire da un url di base e un nome di file inserire nell'url una scadenza (timestamp) e un token di sicurezza
	 * @param  string $baseUrl
	 * @param  string $resource
	 * @param  string $duration
	 * @return string
	 */
	public function createPresignedUrl($baseUrl, $resource, $duration = '+30 minutes')
	{
	    $rawUrl = $baseUrl.'/'.strtotime($duration).'/%TOKEN%/'.urlencode($resource);
	    $token = $this->calculateSignatureToken($rawUrl);
	    return str_replace('%TOKEN%', $token, $rawUrl);
	}

	/**
	 * Verifica la scadenza dell'url e l'integrità del token di sicurezza
	 * @param  string $url        Url completo (fullbaseUrl)
	 * @param  int $expiration timestamp
	 * @param  string $token
	 * @return boolean|throws
	 */
	public function validatePresignedUrl($url, $expiration, $token)
	{
		if(time() > $expiration)
			throw new BadRequestException("Link scaduto");

		$url = str_replace('//api', '/api', $url);
	    $rawUrl = str_replace($token, '%TOKEN%', $url);
		if($this->calculateSignatureToken($rawUrl) != $token)
			throw new BadRequestException("Token presigned non valido");

		return true;

	}

    public function calculateSignatureToken($url)
    {
        return md5('2873f681'.md5($url).'!23bjh21g%njdhtrv3421d£$"f48472n');
    }
}
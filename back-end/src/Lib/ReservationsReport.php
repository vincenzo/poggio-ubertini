<?php
namespace App\Lib;

use Cake\Database\Query;
use Cake\Database\Expression\QueryExpression;
use Cake\I18n\FrozenDate;

trait ReservationsReport {

    private $trimestri = [
        'tri1' => ['da' => '%d-01-01', 'a' => '%d-03-31'],
        'tri2' => ['da' => '%d-04-01', 'a' => '%d-06-30'],
        'tri3' => ['da' => '%d-07-01', 'a' => '%d-09-30'],
        'tri4' => ['da' => '%d-10-01', 'a' => '%d-12-31'],
	];

	private $rptDa = null;
	private $rptA = null;
	private $rptData = null;

    public function rptTouristTax()
    {
		$this->__setDateTrimestre();
		$this->__prepareRptDataQuery();
		$this->rptData->where([
			'Guests.residente_montespertoli' => false,
			'Guests.disabile' => false,
		]);
		$this->rptData->formatResults(function ($results){
			return $results->map(function ($row) {
				$line = [
					str_pad($row->room->display_name, 7, '0', STR_PAD_LEFT), // PRG_STANZA
					$row->data_in->format('Ymd'), // DATA_ARRIVO formato AAAAMMGG
					$row->data_in->format('His'), // ORA_ARRIVO formato hhmmss
					$row->data_in->format('Ymd'), // DATA_PRIMA_NOTTE
					$row->data_out ? $row->data_out->format('Ymd') : '00000000', // DATA_PARTENZA formato AAAAMMGG
					$row->data_out ? $row->data_out->format('His') : '000000', // ORA_PARTENZA formato hhmmss
					0, // Flag pagato
					str_pad($row->guest_id, 10, '0', STR_PAD_LEFT),
					'0', // filler
					'0', // filler
					'01', // cod. esenzione
					'01', // cod. limite imposta
					str_pad($row->guest->nome, 30),
					str_pad($row->guest->cognome, 30),
					str_pad('', 16), // cod_fiscale
					str_pad('', 8, '0'), // data_nas
					str_pad('', 35), // luo_nas
					str_pad('', 2), // prov_nas
					str_pad('', 35), // naz_nas
					str_pad('', 60), // indirizzo
					str_pad('', 5), // cap
					str_pad('', 35), // localita
					str_pad('', 2), // prov
					str_pad('', 35), // nazione
					str_pad('', 20), // telefono
					str_pad('', 20), // fax
					str_pad('', 250), // email
					str_pad('', 30), // tipo_doc
					str_pad('', 30), // num_doc
					str_pad('', 8, '0'), // data_ril
					'0', // privacy 1
					'0', // privacy 2
					'0', // privacy 3
				];
				return join('', $line);	
			});
		});
		$response = $this->response
			->withStringBody(join("\r\n", $this->rptData->toArray()))
			->withType('txt')
			->withDownload('touristTax.txt')
		;
		return $response;
		// $this->_setJson(true, $this->rptData);
    }

    public function rptPoliziaStato()
    {
        
	}

	private function __setDateTrimestre()
	{
		// $this->requireFields(['trimestre', 'y']);
		$trimestre = $this->request->getData('trimestre', 2);
		$y = (int)$this->request->getData('y', 2019);
		$this->rptDa = new FrozenDate(sprintf($this->trimestri['tri'.$trimestre]['da'], $y));
		$this->rptA = new FrozenDate(sprintf($this->trimestri['tri'.$trimestre]['a'], $y));
	}
	
	private function __prepareRptDataQuery()
	{
		$q = $this->Reservations->find()
		->contain([
			'Guests', 'Rooms', 'Rooms.Structures'
			])
		->select([
			'room_id', 'guest_id', 'data_in', 'data_out',
			'Rooms.numero', 'Rooms.structure_id', 'Structures.nome',
			'Guests.nome', 'Guests.cognome', 'Guests.documento_italiano', 'Guests.documento_tipo', 'Guests.documento_numero', 'Guests.documento_data_rilascio', 'Guests.documento_data_scadenza', 'Guests.documento_rilasciato_ente', 'Guests.documento_rilasciato_comune', 'Guests.data_nascita', 'Guests.citta_nascita', 'Guests.nazione_nascita', 'Guests.provincia_nascita', 'Guests.cittadinanza_italiana', 'Guests.indirizzo', 'Guests.citta', 'Guests.nazione', 'Guests.cap', 'Guests.provincia',
		])
		->where([
			['OR' => [
				'data_in >=' => $this->rptDa,
				'data_in <'  => $this->rptDa
			]],
			['OR' => [
				'data_out >'  => $this->rptA,
				'data_out <=' => $this->rptA,
				'data_out IS' => null,
			]],
		]);

		$this->rptData = $q;
	}

	/**
	 * exportAlloggiatiWeb function.
	 *
	 * @access private
	 * @param mixed $id (default: null)
	 * @return void
	 */
	private function exportAlloggiatiWeb($date = null) {

    	// trovo tutti gli utenti arrivati alla struttura in data odierna e creo il file txt che interessa alla polizia

    	if ( !isset($date) )
    		$date = date('Y-m-d');
    	else
    		$date = date('Y-m-d', strtotime($date));
    	// debug($date);

		$fname = '';

		$reservations = $this->recuperaPrenotazioni(null, array('Guest', 'Camp' => array('name', 'user_id', 'date_start', 'date_end')), 'alloggiati', $date);
		// debug($reservations);

    $this->loadModel('Commune');

		$capigruppoRimossi = 0;
		$countCampi = array();

		// foreach($reservations as $k => $r) {

		// 	// conto quanti campi ci sono nell'export e quanti utenti per ogni campo
		// 	// TODO attualmente l'export gestisce solo i casi in cui non vi siano 2 o più campi lo stesso giorno
		// 	if( !isset($countCampi[$r['Reservation']['camp_id']]) ) {
		// 		$countCampi[$r['Reservation']['camp_id']] = 0;
		// 	} else {
		// 		$countCampi[$r['Reservation']['camp_id']]++;
		// 	}

		// 	if($r['Camp']['user_id'] == $r['Guest']['user_id']) {
		// 		unset($reservations[$k]);
		// 		$reservations = array_values($reservations);
		// 		$capigruppoRimossi++;
		// 	}
		// }
		// debug($reservations);

		// debug('Presenti ' . count($countCampi) . ' campi');
		// debug('Rimossi ' . $capigruppoRimossi . ' capigruppo');

		// if(count($countCampi) > 1) {
		// 	throw new NotFoundException(__('Sono presenti più di un campo nello stesso giorno, rivedere l\'export'));
		// }

		$data = array();

		// header
		/*
		$data[] = array(
			'tipo_alloggiato',
			'data_arrivo',
			'giorni_permanenza',
			'cognome',
			'nome',
			'sesso',
			'data_nascita',
			'comune_nascita',
			'provincia_nascita',
			'stato_nascita',
			'cittadinanza',
			'comune_residenza',
			'provincia_residenza',
			'stato_residenza',
			'indirizzo',
			'tipo_documento',
			'numero_documento',
			'luogo_rilascio_documento',
		);
		*/

		// recupero i dati del capogruppo, ipotizzando che in un giorno arrivino utenti di un solo campo e che quindi tutte le $reservations appartengono allo stesso campo
		if(!empty($reservations)) {
			$capogruppo = $reservations[0]['Camp']['user_id'];
			$idCampo = $reservations[0]['Reservation']['camp_id'];

			$dati_capogruppo = $this->Camp->Reservation->Guest->find('first', array('conditions' => array(
				'Guest.user_id' => $capogruppo
			)));
			// debug($dati_capogruppo);

			$reservationCapogruppo = $this->Reservation->find('first', array(
				'contain' => array('Guest', 'Camp' => array('user_id', 'date_start', 'date_end')),
				'conditions' => array(
					'Reservation.camp_id' => $idCampo,
					'Reservation.guest_id' => $dati_capogruppo['Guest']['id'],
				)
			));
			// debug($reservationCapogruppo);

			if(empty($reservationCapogruppo)) {
				throw new NotFoundException(__('Il capogruppo non risulta nella lista dei partecipanti al campo: ' . $reservations[0]['Camp']['name']));
			} else {
				array_unshift($reservations, $reservationCapogruppo);
			}
		}

		// debug($reservations);

		foreach( $reservations as $r ) {

			/* è il capogruppo di questo campo? */
			$check_capogruppo = $r['Guest']['capogruppo'] ? (($r['Camp']['user_id'] == $r['Guest']['user_id']) ? true : false) : false;

			// debug($r);

			$dateIn = new DateTime($r['Reservation']['date_in']);
			$dateIn = $dateIn->format('Y-m-d');

			$datetime1 = new DateTime( $dateIn );
			$datetime2 = new DateTime( $r['Camp']['date_end'] );
			$durata_soggiorno = $datetime1->diff($datetime2);
			// debug($durata_soggiorno);

			$datetime1 = new DateTime( $r['Guest']['data_nascita'] );
			$datetime2 = new DateTime( date('Y-m-d') );
			$interval = $datetime1->diff($datetime2);

			#debug('Prov. '.$r['Guest']['provincia_nascita']);
			#debug('Citta '.$r['Guest']['citta_nascita']);

			// debug('Nazione nascita: ' . $r['Guest']['nazione_nascita']);
			// debug($this->nazioni($r['Guest']['nazione_nascita']));

			if(empty($r['Guest']['nazione_nascita'])) {
				throw new NotFoundException(__('Lo stato di nascita di ' . $r['Guest']['name'] . ' ' . $r['Guest']['last_name'] . " non è stato compilato."));
			}

			$this->loadModel('State');
			$codStato = $this->State->find('first', array(
				'recursive' => -1,
				'conditions' => array(
					'descrizione LIKE' => $this->nazioni($r['Guest']['nazione_nascita']),
				)
			));
			#debug($codStato);

			if(empty($codStato)) {
				throw new NotFoundException(__('Lo stato di nascita: ' . $r['Guest']['nazione_nascita'] . ' di ' . $r['Guest']['name'] . ' ' . $r['Guest']['last_name'] . ' non sembra essere corretto.'));
			}

			$codStatoRes = $this->State->find('first', array(
				'recursive' => -1,
				'conditions' => array(
					'descrizione LIKE' => $this->nazioni($r['Guest']['nazione_residenza']),
				)
			));

			if(empty($codStatoRes)) {
				throw new NotFoundException(__('Lo stato di residenza: ' . $r['Guest']['nazione_residenza'] . ' di ' . $r['Guest']['name'] . ' ' . $r['Guest']['last_name'] . ' non sembra essere corretto.'));
			}

			// debug($codStatoRes);
			$codDocumento = ( $r['Guest']['tipo_documento'] ? 'PASOR' : 'IDENT' );

			if ( 'ITALIA' != $codStato['State']['descrizione'] )
			{
				$codComuneDocumento['Commune']['codice'] = $codStato['State']['codice'];

				// comune di nascita è obbligatorio solo se lo stato di nascita è ITALIA
				$codComuneNascita['Commune']['codice'] = '';

				// provincia di nascita è obbligatorio solo se lo stato di nascita è ITALIA
				$provinciaNascita  = '';
			} else {
				$codComuneNascita = $this->Commune->find('first', array(
					'recursive' => -1,
					'conditions' => array(
						// 'provincia LIKE' => $r['Guest']['provincia_nascita'].'%',
						'descrizione LIKE' => $r['Guest']['citta_nascita']
					)
				));

				if(empty($codComuneNascita)) {
					throw new NotFoundException(__('Il comune di nascita: ' . $r['Guest']['citta_nascita'] . ' di ' . $r['Guest']['name'] . ' ' . $r['Guest']['last_name'] . ' non sembra essere corretto.'));
				}

				$provinciaNascita = $this->province($r['Guest']['provincia_nascita']);
			}

			if ($r['Guest']['documento_italiano'] && $check_capogruppo) {
				$codComuneDocumento = $this->Commune->find('first', array(
					'recursive' => -1,
					'conditions' => array(
						'descrizione LIKE' => $r['Guest']['rilasciato_da_comune_documento']
					)
				));
				#debug($codComuneResidenza);

				if(empty($codComuneDocumento)) {
					throw new NotFoundException(__('Il comune di rilascio del documento: ' . $r['Guest']['rilasciato_da_comune_documento'] . ' di ' . $r['Guest']['name'] . ' ' . $r['Guest']['last_name'] . ' non sembra essere corretto.'));
				}
			} else {
				// TODO verificare se è corretto o se a volte deve essere vuoto, magari il codice stato va solo se stato diverso da italia
				// inoltre verificare se è da aggiungere una input per lo stato di rilascio del documento
				$codComuneDocumento['Commune']['codice'] = $codStato['State']['codice'];
			}

			$gender = 2;
			if ( 'M' == $r['Guest']['gender'] )
				$gender = 1;

			$data[] = array(
				($check_capogruppo ? '18' : '20'), // devo sapere se l'utente è il capogruppo, poiché in tal caso ci sono dei dati obbligatori da compilare
				date('d/m/Y', strtotime($r['Reservation']['date_in'])),
				str_pad( $durata_soggiorno->days, 2), // 2 caratteri per il numero di giorni di permanenza, il campo è obbligatorio
				str_pad( substr($r['Guest']['last_name'], 0, 50), 50),
				str_pad( substr($r['Guest']['name'], 0, 30), 30),
				$gender,
				date('d/m/Y', strtotime($r['Guest']['data_nascita'])),
				str_pad( $codComuneNascita['Commune']['codice'], 9 ), // codice comune
				str_pad( $provinciaNascita, 2),
				str_pad( $codStato['State']['codice'], 9), // stato
				str_pad( $codStato['State']['codice'], 9), // cittadinanza
				str_pad( ( $check_capogruppo ? $codDocumento : '' ), 5),
				str_pad( ( $check_capogruppo ? $r['Guest']['numero_documento'] : '' ), 20),
				str_pad( ( $check_capogruppo ? $codComuneDocumento['Commune']['codice'] : '' ), 9)
			);
		}
		#debug($data); die();

		$dir = 'files/exports/';
		$fname = 'alloggiatiWeb.txt';

		$fp = fopen($dir.$fname, 'w');

		$numData = count($data)-1;

		foreach ($data as $n => $d) {
		    foreach($d as $v) {
		    	fwrite($fp,$v);
		    }
		    if ( $n != $numData )
		    	fwrite($fp, "\r\n");
		}

		fclose($fp);

		return $fname;
	}
}
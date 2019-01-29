import { guestsConfig } from './guests.config';
import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';
import { EwCommonService } from '../../vendors/ew-angularjs-utils/common/common-service';

export class GuestsService extends EwCommonService {

  apiPath: string;
  dbFields: Array<any>;

  constructor(
    private EwServerService: EwServerService,
  ) {
    'ngInject';

    super('guests', guestsConfig, EwServerService);

    this.dbFields = [
      { name: 'id', type: 'number' },
      { name: 'user_id', type: 'number' },
      { name: 'nome', type: 'string' },
      { name: 'cognome', type: 'string' },
      { name: 'documento_italiano', type: 'boolean' },
      { name: 'documento_tipo', type: 'string' },
      { name: 'documento_numero', type: 'string' },
      { name: 'documento_data_rilascio', type: 'string' },
      { name: 'documento_data_scadenza', type: 'string' },
      { name: 'documento_rilasciato_ente', type: 'string' },
      { name: 'documento_rilasciato_comune', type: 'string' },
      { name: 'data_nascita', type: 'date' },
      { name: 'citta_nascita', type: 'string' },
      { name: 'nazione_nascita', type: 'string' },
      { name: 'provincia_nascita', type: 'string' },
      { name: 'cittadinanza_italiana', type: 'string' },
      { name: 'indirizzo', type: 'string' },
      { name: 'citta', type: 'string' },
      { name: 'nazione', type: 'string' },
      { name: 'cap', type: 'number' },
      { name: 'provincia', type: 'string' },
      { name: 'residente_montespertoli', type: 'string' },
      { name: 'codice_fiscale', type: 'string' },
      { name: 'genere', type: 'string' },
      { name: 'privacy', type: 'boolean' },
      { name: 'socio', type: 'boolean' },
      { name: 'disabile', type: 'boolean' },
      { name: 'allergie', type: 'string' },
      { name: 'note', type: 'string' },
      { name: 'created', type: 'date' },
      { name: 'modified', type: 'date' },
    ];

    this.ignoreFieldsOnSave = ['created', 'modified'];
  }

  filterActive = value => {
    // return this.addFilterOnField('Guests.active', value);
  };

  /**
   * PRIVATES
   */
}

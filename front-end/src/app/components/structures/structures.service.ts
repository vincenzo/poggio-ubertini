import { structuresConfig } from './structures.config';
import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';
import { EwCommonService } from '../../vendors/ew-angularjs-utils/common/common-service';

export class StructuresService extends EwCommonService {

  apiPath: string;
  dbFields: Array<any>;

  constructor(
    private EwServerService: EwServerService,
  ) {
    'ngInject';

    super('structures', structuresConfig, EwServerService);

    this.dbFields = [
      { name: 'id', type: 'number' },
      { name: 'capogruppo_id', type: 'number' },
      { name: 'n_scheda', type: 'number' },
      { name: 'data_scheda', type: 'date' },
      { name: 'nome', type: 'string' },
      { name: 'data_inizio', type: 'date' },
      { name: 'data_fine', type: 'date' },
      { name: 'tipo', type: 'string' },
      { name: 'fattura_ragione_sociale', type: 'string' },
      { name: 'fattura_codice_fiscale', type: 'string' },
      { name: 'fattura_partita_iva', type: 'string' },
      { name: 'fattura_indirizzo', type: 'string' },
      { name: 'fattura_citta', type: 'string' },
      { name: 'fattura_nazione', type: 'string' },
      { name: 'fattura_provincia', type: 'string' },
      { name: 'fattura_cap', type: 'number' },
      { name: 'tipo_documento_fiscale', type: 'string' },
      { name: 'note', type: 'string' },
      { name: 'chiuso', type: 'boolean' },
      { name: 'created', type: 'date' },
      { name: 'modified', type: 'date' },
    ];

    this.ignoreFieldsOnSave = ['created', 'modified'];
  }

  filterActive = value => {
    // return this.addFilterOnField('Structures.active', value);
  };

  /**
   * PRIVATES
   */
}

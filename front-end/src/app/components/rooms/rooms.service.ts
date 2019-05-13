import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';
import { EwCommonService } from '../../vendors/ew-angularjs-utils/common/common-service';

export class RoomsService extends EwCommonService {

  apiPath: string;
  dbFields: Array<any>;

  constructor(
    private EwServerService: EwServerService,
  ) {
    'ngInject';

    super('rooms', null, EwServerService);

    this.dbFields = [
      { name: 'id', type: 'number' },
      { name: 'structure_id', type: 'number' },
      { name: 'numero', type: 'string' },
      { name: 'posti_letto', type: 'number' },
      { name: 'posti_liberi', type: 'number' },
      { name: 'servizi', type: 'boolean' },
    ];

    this.ignoreFieldsOnSave = ['created', 'modified'];
  }

  /**
   * PRIVATES
   */
}

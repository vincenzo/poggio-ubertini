import { reservationsConfig } from './reservations.config';
import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';
import { EwCommonService } from '../../vendors/ew-angularjs-utils/common/common-service';

export class ReservationsService extends EwCommonService {

  apiPath: string;
  dbFields: Array<any>;

  constructor(
    private EwServerService: EwServerService,
  ) {
    'ngInject';

    super('reservations', reservationsConfig, EwServerService);

    this.dbFields = [
      { name:'id', type: 'number' },
      { name:'camp_id', type: 'number' },
      { name:'guest_id', type: 'number' },
      { name:'room_id', type: 'number' },
      { name:'data_in', type: 'date' },
      { name:'data_out', type: 'date' },
      { name:'flag_in', type: 'boolean' },
      { name:'flag_out', type: 'boolean' },
      { name:'tipo_tariffa', type: 'string' },
      { name:'lenzuola', type: 'string' },
      { name:'asciugamani', type: 'boolean' },
      { name:'responsabile', type: 'boolean' },
      { name:'created', type: 'date' },
      { name:'modified', type: 'date' },
    ];

    this.ignoreFieldsOnSave = ['created', 'modified'];
  }

  filterActive = value => {
    // return this.addFilterOnField('Reservations.active', value);
  };

  /**
   * PRIVATES
   */
}

import * as angular from 'angular';
import * as moment from 'moment';

import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';
import { EwCommonService } from '../../vendors/ew-angularjs-utils/common/common-service';

export class DashboardService extends EwCommonService {

  apiPath: string;
  dbFields: Array<any>;

  constructor(
    private EwServerService: EwServerService,
  ) {
    'ngInject';

    super('dashboard', null, EwServerService);

    this.dbFields = [
    ];

    this.ignoreFieldsOnSave = [];
  }

  /**
   * PRIVATES
   */

}

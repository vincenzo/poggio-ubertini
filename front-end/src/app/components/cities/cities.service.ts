import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';

export class CitiesService {

  apiPath: string;

  constructor(
    private EwServerService: EwServerService,
  ) {
    'ngInject';

    this.apiPath = '/cities';
  }

  autocomplete(comune) {
    return this.EwServerService.post(this.apiPath + '/search', { comune }).then(res => res.data);
  }

  /**
   * PRIVATES
   */
}

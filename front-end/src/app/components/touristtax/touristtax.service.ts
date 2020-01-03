import { EwServerService } from "../../vendors/ew-angularjs-utils/components/server/server.service";
import { EwCommonService } from "../../vendors/ew-angularjs-utils/common/common-service";

export class TouristtaxService extends EwCommonService {
  apiPath: string;
  dbFields: Array<any>;

  constructor(private EwServerService: EwServerService) {
    "ngInject";

    super("guests", null, EwServerService);
  }

  /**
   * PRIVATES
   */
}

import { EwServerService } from "../../vendors/ew-angularjs-utils/components/server/server.service";
import { EwCommonService } from "../../vendors/ew-angularjs-utils/common/common-service";

export class TouristtaxService extends EwCommonService {
  apiPath: string;
  dbFields: Array<any>;

  constructor(private EwServerService: EwServerService) {
    "ngInject";

    super("touristtax", null, EwServerService);

    this.apiPath = "/reservations";
  }

  report = (data: { y: number; tri: string }) => {
    return this._report(data);
  };

  /**
   * PRIVATES
   */

  private _report(data) {
    const config = {
      responseType: "blob",
      timeout: 15000
    };
    return this.serverService
      .post(
        `${this.apiPath}/rptTouristTax`,
        {
          y: data.y,
          trimestre: data.tri
        },
        config
      )
      .then(res => res.data);
  }
}

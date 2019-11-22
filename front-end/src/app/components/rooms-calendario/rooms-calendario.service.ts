import { EwServerService } from "../../vendors/ew-angularjs-utils/components/server/server.service";
import { EwCommonService } from "../../vendors/ew-angularjs-utils/common/common-service";

import { promiseAction } from "./rooms-calendario.actions";

export class RoomsCalendarioService extends EwCommonService {
  apiPath: string;
  dbFields: Array<any>;

  constructor(private EwServerService: EwServerService) {
    "ngInject";

    super("rooms-calendario", null, EwServerService);

    this.apiPath = '/rooms';

    this.dbFields = [{ name: "id", type: "number" }];

    this.ignoreFieldsOnSave = [];
  }

  getCalendario = year => dispatch => {
    return dispatch(promiseAction("GET_CALENDARIO", this._getCalendario(year)));
  };

  /**
   * PRIVATES
   */

  private _getCalendario(year) {
    return this.serverService
      .post(this.apiPath + "/getCalendario", { anno: year })
      .then((response: any) => response.data);
  }
}

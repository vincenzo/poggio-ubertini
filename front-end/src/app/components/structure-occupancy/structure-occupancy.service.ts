import { EwServerService } from "../../vendors/ew-angularjs-utils/components/server/server.service";
import { EwCommonService } from "../../vendors/ew-angularjs-utils/common/common-service";

import { promiseAction } from "./structure-occupancy.actions";

export class StructureOccupancyService extends EwCommonService {
  apiPath: string;

  constructor(private EwServerService: EwServerService) {
    "ngInject";

    super("structureOccupancy", null, EwServerService);
  }

  getDisponibilita = () => dispatch => {
    return dispatch(
      promiseAction("GET_DISPONIBILITA", this._getDisponibilita())
    );
  };

  /**
   * PRIVATES
   */

  private _getDisponibilita() {
    return this.serverService
      .post("/rooms/getDisponibilitaCampo", {
        data_da: '2019-01-01',
        data_a: '2019-12-31',
      })
      .then((response: any) => response.data);
  }
}

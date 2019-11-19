import { EwServerService } from "../../vendors/ew-angularjs-utils/components/server/server.service";
import { EwCommonService } from "../../vendors/ew-angularjs-utils/common/common-service";

import { promiseAction } from "./rooms.actions";

export class RoomsService extends EwCommonService {
  apiPath: string;
  dbFields: Array<any>;

  constructor(private EwServerService: EwServerService) {
    "ngInject";

    super("rooms", null, EwServerService);

    this.dbFields = [
      { name: "id", type: "number" },
      { name: "structure_id", type: "number" },
      { name: "numero", type: "string" },
      { name: "posti_letto", type: "number" },
      { name: "posti_liberi", type: "number" },
      { name: "servizi", type: "boolean" }
    ];

    this.ignoreFieldsOnSave = ["created", "modified"];
  }

  getDisponibilita = (dataDa: string, dataA?: string) => dispatch => {
    return dispatch(
      promiseAction("GET_DISPONIBILITA", this._getDisponibilita(dataDa, dataA))
    );
  };

  getDisponibilitaCampo = data => {
    return this._getDisponibilitaCampo(data);
  };

  /**
   * PRIVATES
   */

  private _getDisponibilita(data_da: string, data_a?: string) {
    data_a = data_a || data_da;
    return this.serverService
      .post(this.apiPath + "/getDisponibilita", { data_da, data_a })
      .then((response: any) => response.data);
  }

  private _getDisponibilitaCampo(data) {
    return this.serverService
      .post(this.apiPath + "/getDisponibilitaCampo", data)
      .then((response: any) => response.data);
  }
}

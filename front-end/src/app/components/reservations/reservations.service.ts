import { reservationsConfig } from "./reservations.config";
import { EwServerService } from "../../vendors/ew-angularjs-utils/components/server/server.service";
import { EwCommonService } from "../../vendors/ew-angularjs-utils/common/common-service";

import { promiseAction } from "./reservations.actions";

type TMultiActionsParams =
  | {
      type: "in" | "out";
      value: string;
    }
  | {
      room_id: number;
      data_previsto_in: string;
      data_previsto_out: string;
    };

export class ReservationsService extends EwCommonService {
  apiPath: string;
  dbFields: Array<any>;

  constructor(private EwServerService: EwServerService) {
    "ngInject";

    super("reservations", reservationsConfig, EwServerService);

    this.dbFields = [
      { name: "id", type: "number" },
      { name: "camp_id", type: "number" },
      { name: "guest_id", type: "number" },
      { name: "room_id", type: "number" },
      { name: "data_in", type: "date" },
      { name: "data_out", type: "date" },
      { name: "flag_in", type: "boolean" },
      { name: "flag_out", type: "boolean" },
      { name: "tipo_tariffa", type: "string" },
      { name: "lenzuola", type: "string" },
      { name: "asciugamani", type: "boolean" },
      { name: "responsabile", type: "boolean" },
      { name: "created", type: "date" },
      { name: "modified", type: "date" }
    ];

    this.ignoreFieldsOnSave = ["created", "modified"];
  }

  multiActions = (
    action: "check" | "assignRoom",
    ids: number[],
    params: TMultiActionsParams
  ) => dispatch => {
    return dispatch(
      promiseAction("MULTI_ACTIONS", this._multiActions(action, ids, params))
    );
  };

  nominaCapogruppo(reservationId) {
    return this.serverService
      .post(this.apiPath + "/nominaCapogruppo", { id: reservationId })
      .then((response: any) => response.data);
  }

  removeRoom(id) {
    return this.serverService
      .post(this.apiPath + "/removeRoom", { id })
      .then((response: any) => response.data);
  }

  /**
   * PRIVATES
   */

  private _multiActions(action: "check" | "assignRoom", ids: number[], params) {
    return this.serverService
      .post(
        this.apiPath + "/multiActions",
        { action, ids, params },
        { ignoreLoadingBar: true }
      )
      .then((response: any) => response.data);
  }
}

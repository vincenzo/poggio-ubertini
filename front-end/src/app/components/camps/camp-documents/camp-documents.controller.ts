import { RoomsService } from "./../../rooms/rooms.service";
import { ModalService } from "./../../../vendors/ew-angularjs-utils/components/modal/modal.service";
import * as moment from "moment";
import * as jquery from "jquery";
import swal from "sweetalert2";

import { EwCommonFormController } from "../../../vendors/ew-angularjs-utils/common/common-form-controller";
import { CampsService } from "./../../camps/camps.service";

export class CampDocumentsComponentController extends EwCommonFormController {
  modelFileOspiti: any;
  multipleOptionsSelect: any;
  addManyGuests: Function;
  getCampFormData: Function;
  getDisponibilitaCampo: Function;
  saveReservation: Function;
  selectAll: boolean;
  sortColumnName: string;
  sortReverse: boolean;
  sortReverseclass: string;

  multiActions: (
    action: "check" | "assignRoom",
    ids: number[],
    params
  ) => Promise<any>;

  constructor(
    $ngRedux,
    hotkeys,
    CampsService: CampsService,
    public ModalService: ModalService
  ) {
    "ngInject";
    super($ngRedux, CampsService);
    this.config = {
      deleteSuccess: "Ospite cancellato correttamente",
      formId: "#camp-guests-form",
      isModal: false,
      parentIdParam: "id",
      parentRoute: "camps.view",
      saveError: "Sono presenti degli errori. Controlla e riprova.",
      saveSuccess: "Ospite salvato.",
      title: "Ospiti campo",
      titleEntity: "ospite"
    };
  }

  getMapDispatchToThisParams(dispatch) {
    return {};
  }

  getMapStateToThisParams(state) {
    return {};
  }

  /**
   * PRIVATES
   */
}

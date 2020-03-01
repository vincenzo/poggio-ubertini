import { UploadsService } from "./../../../vendors/ew-angularjs-utils/components/uploads/uploads.service";
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
  modelFileExtra: any;
  saveReservation: Function;
  selectAll: boolean;
  sortColumnName: string;
  sortReverse: boolean;
  sortReverseclass: string;
  uploadFile: Function;

  multiActions: (
    action: "check" | "assignRoom",
    ids: number[],
    params
  ) => Promise<any>;

  constructor(
    $ngRedux,
    hotkeys,
    CampsService: CampsService,
    public ModalService: ModalService,
    private UploadsService: UploadsService
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
    return {
      uploadFile: model => dispatch(this.UploadsService.upload(model))
    };
  }

  getMapStateToThisParams(state) {
    return {};
  }

  upload(file) {
    // console.log("file", file);

    const data = {
      file: file.value,
      model_name: "Camps",
      model_id: this.model.id,
      categoria: "extra"
    };

    this.modelFileExtra = null;

    return this._uploadFile(data);
  }

  /**
   * PRIVATES
   */

  private _uploadFile(upload) {
    return this.uploadFile(upload).then(
      ({ sameRoute, upload }) => sameRoute && this.getFormData(this.model.id)
    );
  }
}

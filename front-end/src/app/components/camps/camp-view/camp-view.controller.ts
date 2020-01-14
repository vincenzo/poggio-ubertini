import { RoomsService } from "./../../rooms/rooms.service";
import * as moment from "moment";
import { EwCommonFormController } from "../../../vendors/ew-angularjs-utils/common/common-form-controller";
import { CampsService } from "../camps.service";
import { ReservationsService } from "./../../reservations/reservations.service";
import { UploadsService } from "../../../vendors/ew-angularjs-utils/components/uploads/uploads.service";

export class CampViewComponentController extends EwCommonFormController {
  getDisponibilita: (dataDa: string, dataA?: string) => Promise<any>;
  uploadFile: Function;

  constructor(
    $ngRedux,
    hotkeys,
    CampsService: CampsService,
    private UploadsService: UploadsService,
    private RoomsService: RoomsService,
    private ReservationsService: ReservationsService
  ) {
    "ngInject";
    super($ngRedux, CampsService);
    this.config = {
      deleteSuccess: "Campo cancellato correttamente",
      formId: "#camps-form",
      isModal: false,
      parentIdParam: "id",
      parentRoute: "camps",
      saveError: "Sono presenti degli errori. Controlla e riprova.",
      saveSuccess: "Campo salvato.",
      title: "Dati campo",
      titleEntity: "campo"
    };
  }

  chiudi(id) {
    var answer = confirm("Confermi di voler chiudere il campo?");
    if (answer) {
      return this.service.chiudi(id)
        .then(response => this.getFormData(id))
        .then(() => this.service.toaster.success('Campo chiuso correttamente'));
    }
  }

  consuntivo(id) {
    return this.stateGo("consuntivo", { id });
  }

  getMapDispatchToThisParams(dispatch) {
    return {
      getDisponibilita: (dataDa, dataA?) =>
        dispatch(this.RoomsService.getDisponibilita(dataDa, dataA)),
      uploadFile: model => dispatch(this.UploadsService.upload(model))
    };
  }

  selectTab(tabName: string) {
    this.focusOnField("#focused_input_" + tabName);
  }

  getAvailability() {
    if (!this.model.data_disponibilita) {
      return;
    }

    return this.getDisponibilita(this.model.data_disponibilita);
  }

  upload(file) {
    // console.log("file", file);

    const data = {
      file: file.value,
      model_name: "Camps",
      model_id: this.model.id,
      categoria: "ipotesi_spesa"
    };

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

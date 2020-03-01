import { RoomsService } from "./../../rooms/rooms.service";
import * as moment from "moment";
import { EwCommonFormController } from "../../../vendors/ew-angularjs-utils/common/common-form-controller";
import { CampsService } from "../camps.service";
import { ReservationsService } from "./../../reservations/reservations.service";
import { UploadsService } from "../../../vendors/ew-angularjs-utils/components/uploads/uploads.service";

export class CampViewComponentController extends EwCommonFormController {
  getDisponibilitaCampo: (data: {
    camp_id: number;
    data_da: string;
    data_a: string;
  }) => Promise<any>;
  uploadFile: Function;
  _filterGuestsByRoom: Function;

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

  $onInit() {
    super.$onInit();
    this.getAvailability();
  }

  $onDestroy() {
    this.filterGuestsByRoom({ id: null });
  }

  chiudi(id) {
    var answer = confirm("Confermi di voler chiudere il campo?");
    if (answer) {
      return this.service
        .chiudi(id)
        .then(response => this.getFormData(id))
        .then(() => this.service.toaster.success("Campo chiuso correttamente"))
        .catch(error => this.service.toaster.error(error.data.data.error));
    }
  }

  consuntivo(id) {
    return this.stateGo("consuntivo", { id });
  }

  filterGuestsByRoom(room) {
    this.activeTab = 0;
    this._filterGuestsByRoom(room.id);
  }

  getMapDispatchToThisParams(dispatch) {
    return {
      getDisponibilitaCampo: data =>
        dispatch(this.RoomsService.getDisponibilita(data)),
      _filterGuestsByRoom: roomId =>
        dispatch(this.service.filterGuestsByRoom(roomId)),
      uploadFile: model => dispatch(this.UploadsService.upload(model))
    };
  }

  selectTab(tabName: string) {
    this.focusOnField("#focused_input_" + tabName);
  }

  getAvailability() {
    return this.getDisponibilitaCampo({
      camp_id: this.model.id,
      data_da: moment(this.model.data_inizio).format("YYYY-MM-DD"),
      data_a: moment(this.model.data_fine).format("YYYY-MM-DD")
    });
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

import { RoomsService } from "./../../rooms/rooms.service";
import * as moment from "moment";
import { EwCommonFormController } from "../../../vendors/ew-angularjs-utils/common/common-form-controller";
import { CampsService } from "../camps.service";
import { ReservationsService } from "./../../reservations/reservations.service";

export class CampViewComponentController extends EwCommonFormController {
  getDisponibilita: (dataDa: string, dataA?: string) => Promise<any>;

  constructor(
    $ngRedux,
    hotkeys,
    CampsService: CampsService,
    private Upload,
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

  getMapDispatchToThisParams(dispatch) {
    return {
      getDisponibilita: (dataDa, dataA?) =>
        dispatch(this.RoomsService.getDisponibilita(dataDa, dataA))
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

  uploadFile(event) {
    console.log("event", event);

    // return this.Upload.upload({
    //   ignoreLoadingBar: true,
    //   url: "/api" + this.apiPath + "/addGuestsFromFile",
    //   data: data,
    //   headers: {
    //     Accept: "application/json"
    //   },
    //   timeout: 10000
    // }).then(resp => resp.data);
  }

  /**
   * PRIVATES
   */
}

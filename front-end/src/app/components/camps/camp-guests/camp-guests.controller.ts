import { EwCommonFormController } from "../../../vendors/ew-angularjs-utils/common/common-form-controller";
import { GuestsService } from "../../guests/guests.service";
import { CampsService } from "./../../camps/camps.service";
import { ReservationsService } from "./../../reservations/reservations.service";
import { CitiesService } from "./../../cities/cities.service";

export class CampGuestsComponentController extends EwCommonFormController {
  reservations: any[];
  getCampFormData: Function;
  saveReservation: Function;

  constructor(
    $ngRedux,
    hotkeys,
    GuestsService: GuestsService,
    private CampsService: CampsService,
    private ReservationsService: ReservationsService,
    private CitiesService: CitiesService
  ) {
    "ngInject";
    super($ngRedux, GuestsService);
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

  $onChanges(changes) {
    if (changes.reservations) {
      this.reservations = [...this.reservations];
    }
  }

  afterGet(stay: any, model: any, response: any) {
    if (!this.fromParent) {
      return super.afterGet(stay, model, response);
    }

    return this.saveReservation({
      camp_id: this.parentId,
      guest_id: response.id
    })
      .then(() => this.getCampFormData(this.parentId))
      .then(() => this.resetModel());
  }

  getMapDispatchToThisParams(dispatch) {
    return {
      getCampFormData: id => dispatch(this.CampsService.getFormData(id)),
      saveReservation: model => dispatch(this.ReservationsService.save(model))
    };
  }

  getParentRoutes() {
    return ["camps.view"];
  }

  queryCity(event) {
    return (
      this.CitiesService.search(event.query)
        // aggiungo a mano il valore cercato se nessun risultato presente
        .then((res: any) =>
          res.data.length
            ? res.data
            : [
                {
                  id: null,
                  codice: null,
                  comune: event.query,
                  datafineval: null,
                  provincia: ""
                }
              ]
        )
    );
  }

  selectCitta(event) {
    this.updateModel({
      name: "citta",
      value: event.item.comune
    });

    if (event.item.id) {
      this.updateModel({
        name: "nazione",
        value: "ITALIA"
      });
      this.updateModel({
        name: "provincia",
        value: event.item.provincia
      });
      this.focusOnField(`${this.config.formId} #provincia`);
    }

    this.updateModel({
      name: "nazione",
      value: null
    });
    this.updateModel({
      name: "provincia",
      value: ""
    });
    this.focusOnField(`${this.config.formId} #se-nazione`);
  }

  selectCittaNascita(event) {
    this.updateModel({
      name: "citta_nascita",
      value: event.item.comune
    });

    if (event.item.id) {
      this.updateModel({
        name: "nazione_nascita",
        value: "ITALIA"
      });
      this.updateModel({
        name: "provincia_nascita",
        value: event.item.provincia
      });
      this.focusOnField(`${this.config.formId} #provincia_nascita`);
    }

    this.updateModel({
      name: "nazione_nascita",
      value: null
    });
    this.updateModel({
      name: "provincia_nascita",
      value: ""
    });
    this.focusOnField(`${this.config.formId} #se-nazione_nascita`);
  }

  /**
   * PRIVATES
   */
}

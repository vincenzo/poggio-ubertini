import * as moment from "moment";
import * as jquery from "jquery";
import swal from "sweetalert2";

import { EwCommonFormController } from "../../../vendors/ew-angularjs-utils/common/common-form-controller";
import { GuestsService } from "../../guests/guests.service";
import { CampsService } from "./../../camps/camps.service";
import { ReservationsService } from "./../../reservations/reservations.service";
import { CitiesService } from "./../../cities/cities.service";

export class CampGuestsComponentController extends EwCommonFormController {
  reservations: any[];
  modelFileOspiti: any;
  multipleOptionsSelect: any;
  addManyGuests: Function;
  getCampFormData: Function;
  saveReservation: Function;
  selectAll: boolean;

  multiActions: (
    action: "check" | "assignRoom",
    ids: number[],
    params
  ) => Promise<any>;

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
    return this.saveReservation({
      camp_id: this.parentId,
      guest_id: response.id
    })
      .then(() => this.getCampFormData(this.parentId))
      .then(() => this.resetModel());
  }

  checkIn(reservation: any, date?: string) {
    const params = {
      type: "in",
      value: date || moment().format("YYYY-MM-DD")
    };
    return this._check([reservation.id], params);
  }

  checkOut(reservation: any, date?: string) {
    const params = {
      type: "out",
      value: date || moment().format("YYYY-MM-DD")
    };
    return this._check([reservation.id], params);
  }

  getMapDispatchToThisParams(dispatch) {
    return {
      addManyGuests: data => dispatch(this.CampsService.addManyGuests(data)),
      getCampFormData: id => dispatch(this.CampsService.getFormData(id)),
      multiActions: (a, i, p) =>
        dispatch(this.ReservationsService.multiActions(a, i, p)),
      saveReservation: model => dispatch(this.ReservationsService.save(model))
    };
  }

  getMapStateToThisParams(state) {
    return {
      camps: state.camps.toJS()
    };
  }

  getParentRoutes() {
    return ["camps.view"];
  }

  multipleCheckIn() {
    const ids = this.reservations.filter(r => r.selected).map(r => r.id);
    if (!ids.length) {
      return this.service.toaster.info("Seleziona almeno un ospite!");
    }
    swal
      .fire({
        title: "Data Check-in",
        input: "text",
        inputValue: moment().format("DD/MM/YYYY"),
        inputPlaceholder: "gg/mm/aaaa",
        inputValidator: value => {
          if (!value) {
            return "Campo obbligatorio!";
          }
          const momentdate = moment(value, "DD/MM/YYYY", true);
          if (!momentdate.isValid()) {
            return "Formato data non valido!";
          }
        }
      })
      .then(({ value: data }) => {
        if (data) {
          return this.multiActions("check", ids, {
            type: "in",
            value: moment(data, "DD/MM/YYYY").format("YYYY-MM-DD")
          });
        }
      })
      .then(() => this.getCampFormData(this.parentId))
      .then(() => (this.selectAll = false));
  }

  multipleCheckOut() {
    const ids = this.reservations.filter(r => r.selected).map(r => r.id);
    if (!ids.length) {
      return this.service.toaster.info("Seleziona almeno un ospite!");
    }
    swal
      .fire({
        title: "Data Check-out",
        input: "text",
        inputValue: moment().format("DD/MM/YYYY"),
        inputPlaceholder: "gg/mm/aaaa",
        inputValidator: value => {
          if (!value) {
            return "Campo obbligatorio!";
          }
          const momentdate = moment(value, "DD/MM/YYYY", true);
          if (!momentdate.isValid()) {
            return "Formato data non valido!";
          }
        }
      })
      .then(({ value: data }) => {
        if (data) {
          return this.multiActions("check", ids, {
            type: "out",
            value: moment(data, "DD/MM/YYYY").format("YYYY-MM-DD")
          });
        }
      })
      .then(() => this.getCampFormData(this.parentId))
      .then(() => (this.selectAll = false));
  }

  multipleToom() {
    console.log("assegnazione stanze multipla");
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

  toggleCheck(value) {
    setTimeout(
      () =>
        jquery("#guests-table tbody")
          .find("input[type=checkbox]")
          .click()
      // .prop("checked", value)
      // .triggerHandler("click")
      // .trigger("input")
    );
  }

  uploadFile(event) {
    return this.addManyGuests({
      file: event.value
    })
      .then(() => this.getCampFormData(this.parentId))
      .then(() => this.service.toaster.success('Ospiti aggiunti correttamente'))
      .then(() => (this.modelFileOspiti = null))
      .catch(() => this.service.toaster.error('Errore durante il caricamento degli ospiti'));
  }

  /**
   * PRIVATES
   */

  private _check(ids: number[], params: { type: string; value: string }) {
    return this.multiActions("check", ids, params).then(() =>
      this.getCampFormData(this.parentId)
    );
  }
}

import * as jQuery from "jquery";
import { getLookup } from "./../../../vendors/ew-angularjs-utils/components/lookup/lookup.actions";
import { CampsService } from "./../../camps/camps.service";
import { EwCommonFormController } from "../../../vendors/ew-angularjs-utils/common/common-form-controller";
import { ModalService } from "./../../../vendors/ew-angularjs-utils/components/modal/modal.service";

import { ReservationsService } from "./../../reservations/reservations.service";
import { LookupService } from "./../../../vendors/ew-angularjs-utils/components/lookup/lookup.service";
import { CitiesService } from "./../../cities/cities.service";
import { GuestsService } from "../guests.service";

export class GuestsFormComponentController extends EwCommonFormController {
  getLookup: Function;
  getCampFormData: Function;
  saveReservation: Function;

  constructor(
    $ngRedux,
    private GuestsService: GuestsService,
    public ModalService: ModalService,
    private CampsService: CampsService,
    private ReservationsService: ReservationsService,
    private CitiesService: CitiesService,
    private LookupService: LookupService
  ) {
    "ngInject";
    super($ngRedux, GuestsService);
    this.config = {
      deleteSuccess: "Ospite cancellato correttamente",
      formId: "#guestsForm",
      isModal: true,
      parentIdParam: "id",
      parentRoute: "guests",
      saveError: "Sono presenti degli errori. Controlla e riprova.",
      saveSuccess: "Ospite salvato.",
      titleEntity: "ospite"
    };
  }

  afterGet(stay: any, model: any, response: any) {
    if (!this.fromParent) {
      return super.afterGet(stay, model, response);
    }

    return this.saveReservation({
      camp_id: this.parentId,
      guest_id: response.id
    })
      .then(() => this.getFormData(this.model.id))
      .then(() => this.getCampFormData(this.parentId))
      .then(() => (!stay ? this.stateGo("camps.view") : null));
  }

  afterSubmit() {
    this.dismissModal();
    return this.getLookup();
  }

  getParentRoutes() {
    return ["camps.view.guests.add", "camps.view.guests.edit"];
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

  selectCittaNascita(event) {
    this.updateModel({
      name: "citta_nascita",
      value: event.item.comune
    });
    // this.updateModel({
    //   name: "cap",
    //   value: event.item.cap
    // });
    this.updateModel({
      name: "provincia_nascita",
      value: event.item.provincia
    });
    setTimeout(() => jQuery("#se-documento_tipo").focus(), 10);
  }

  selectCitta(event) {
    this.updateModel({
      name: "citta",
      value: event.item.comune
    });
    this.updateModel({
      name: "cap",
      value: event.item.cap
    });
    this.updateModel({
      name: "provincia",
      value: event.item.provincia
    });
    setTimeout(() => jQuery("#cap").focus(), 10);
  }

  getMapDispatchToThisParams(dispatch) {
    return {
      getCampFormData: id => dispatch(this.CampsService.getFormData(id)),
      getLookup: () => dispatch(this.LookupService.getLookup()),
      saveReservation: model => dispatch(this.ReservationsService.save(model))
    };
  }

  /**
   * PRIVATES
   */
}

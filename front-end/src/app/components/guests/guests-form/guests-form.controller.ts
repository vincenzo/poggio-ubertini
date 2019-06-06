import { CampsService } from './../../camps/camps.service';
import { EwCommonFormController } from '../../../vendors/ew-angularjs-utils/common/common-form-controller';

import { ReservationsService } from './../../reservations/reservations.service';
import { LookupService } from './../../../vendors/ew-angularjs-utils/components/lookup/lookup.service';
import { CitiesService } from './../../cities/cities.service';
import { GuestsService } from '../guests.service';

export class GuestsFormComponentController extends EwCommonFormController {

  getCampFormData: Function;
  saveReservation: Function;

  constructor(
    $ngRedux,
    private GuestsService: GuestsService,
    private CampsService: CampsService,
    private ReservationsService: ReservationsService,
    private CitiesService: CitiesService,
    private LookupService: LookupService,
  ) {
    'ngInject';
    super($ngRedux, GuestsService);
    this.config = {
      deleteSuccess: 'Ospite cancellato correttamente',
      formId: '#guests-form',
      isModal: false,
      parentIdParam: 'id',
      parentRoute: 'guests',
      saveError: 'Sono presenti degli errori. Controlla e riprova.',
      saveSuccess: 'Ospite salvato.',
      titleEntity: 'ospite',
    };
  }

  afterGet(stay: any, model: any, response: any) {
    if (!this.fromParent) {
      return super.afterGet(stay, model, response);
    }

    return this.saveReservation({
      camp_id: this.parentId,
      guest_id: response.id,
    })
      .then(() => this.getFormData(this.model.id))
      .then(() => this.getCampFormData(this.parentId))
      .then(() => !stay ? this.stateGo('camps.view') : null)
      ;
  }

  afterSubmit() {
    return this.getLookup();
  }

  getParentRoutes() {
    return ['camps.view.guests.add', 'camps.view.guests.edit'];
  }

  queryCity(event) {
    return this.CitiesService.search(event.query)
      // aggiungo a mano il valore cercato se nessun risultato presente
      .then((res: any) => (res.data.length ? res.data : [{
        'id': null,
        'codice': null,
        'comune': event.query,
        'datafineval': null,
        'provincia': '',
      }]));
  }

  selectCitta(event) {
    this.updateModel({
      name: 'citta',
      value: event.item.comune
    });

    if (event.item.id) {
      this.updateModel({
        name: 'nazione',
        value: 'ITALIA',
      });
      this.updateModel({
        name: 'provincia',
        value: event.item.provincia
      });
      this.focusOnField(`${this.config.formId} #provincia`);
    }

    this.updateModel({
      name: 'nazione',
      value: null,
    });
    this.updateModel({
      name: 'provincia',
      value: ''
    });
    this.focusOnField(`${this.config.formId} #se-nazione`);
  }

  selectCittaNascita(event) {
    this.updateModel({
      name: 'citta_nascita',
      value: event.item.comune
    });

    if (event.item.id) {
      this.updateModel({
        name: 'nazione_nascita',
        value: 'ITALIA',
      });
      this.updateModel({
        name: 'provincia_nascita',
        value: event.item.provincia
      });
      this.focusOnField(`${this.config.formId} #provincia_nascita`);
    }

    this.updateModel({
      name: 'nazione_nascita',
      value: null,
    });
    this.updateModel({
      name: 'provincia_nascita',
      value: ''
    });
    this.focusOnField(`${this.config.formId} #se-nazione_nascita`);
  }

  getMapDispatchToThisParams(dispatch) {
    return {
      getCampFormData: (id) => dispatch(this.CampsService.getFormData(id)),
      getLookup: () => dispatch(this.LookupService.getLookup()),
      saveReservation: model => dispatch(this.ReservationsService.save(model)),
    };
  }

  /**
   * PRIVATES
   */
}

import { EwCommonController } from '../../../vendors/ew-angularjs-utils/common/common-controller';

import { LookupService } from './../../../vendors/ew-angularjs-utils/components/lookup/lookup.service';
import { CitiesService } from './../../cities/cities.service';
import { GuestsService } from '../guests.service';

export class GuestsFormComponentController extends EwCommonController {

  constructor(
    $ngRedux,
    private GuestsService: GuestsService,
    private CitiesService: CitiesService,
    private LookupService: LookupService,
  ) {
    'ngInject';
    super($ngRedux, GuestsService);
    console.log('fromParent', this.fromParent);
  }

  $onInit() {
    super.$onInit();
    console.log('faccio anche il mio');
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
    console.log('sovrascrivo le azioni passando un oggetto aggiornato');
    return {
      getLookup: () => dispatch(this.LookupService.getLookup()),
    };
  }

  /**
   * PRIVATES
   */
}

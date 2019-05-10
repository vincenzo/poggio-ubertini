import { LookupService } from './../../../vendors/ew-angularjs-utils/components/lookup/lookup.service';
import { CitiesService } from './../../cities/cities.service';
import * as jQuery from 'jquery';
import ngRedux from 'ng-redux';
import { scrollToElement } from '../../../vendors/ew-angularjs-utils/utils/scroll-to-top';
import { stateGo } from 'redux-ui-router';
import {
  getLookup,
  getModelForm,
  getModelState,
  getRouterState,
} from '../guests.selectors';

import { GuestsService } from '../guests.service';

export class GuestsFormComponentController {

  action: string;
  form: ng.IFormController;
  get: Function;
  getLookup: Function;
  hasError: any;
  model: any;
  resetModel: Function;
  router: any;
  save: Function;
  stateGo: Function;
  title: string;
  unsubscribe: Function;
  updateModel: Function;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private CitiesService: CitiesService,
    private GuestsService: GuestsService,
    private LookupService: LookupService,
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit() {
    this.title = (this.isEdit() ? 'Modifica ' : 'Aggiungi ') + 'utente';
  }

  $onDestroy() {
    this.unsubscribe();
  }

  isAdd() {
    return this.action === 'add';
  }

  isEdit() {
    return this.action === 'edit';
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
      return setTimeout(() => jQuery('guests-form #provincia').focus(), 10);
    }

    this.updateModel({
      name: 'nazione',
      value: null,
    });
    this.updateModel({
      name: 'provincia',
      value: ''
    });
    setTimeout(() => jQuery('guests-form #se-nazione').focus(), 10);
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
      return setTimeout(() => jQuery('guests-form #provincia_nascita').focus(), 10);
    }

    this.updateModel({
      name: 'nazione_nascita',
      value: null,
    });
    this.updateModel({
      name: 'provincia_nascita',
      value: ''
    });
    setTimeout(() => jQuery('guests-form #se-nazione_nascita').focus(), 10);
  }

  saveAndStay() {
    this.submit(this.model, true);
  }

  submit(model, stay) {
    if (this.form.$valid) {
      return this.save(model)
        .then(() => this.get())
        .then(() => !stay ? this.stateGo('guests') : null)
        .then(() => this.GuestsService.toaster.success('Utente salvato.'))
        .then(() => this.getLookup());
    }

    this.GuestsService.toaster.error('Sono presenti degli errori. Controlla e riprova.');
    const el: any = jQuery('#guestsform-dialog input.ng-invalid:first, select.ng-invalid:first');
    el.focus();
    scrollToElement(el, 80);
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state) {
    return this.GuestsService.mapStateToThisForm()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.GuestsService.mapDispatchToThisForm({
      getLookup: () => dispatch(this.LookupService.getLookup()),
    })(dispatch);
  };
}

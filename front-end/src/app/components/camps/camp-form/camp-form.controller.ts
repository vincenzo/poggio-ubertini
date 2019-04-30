import * as jQuery from 'jquery';
import ngRedux from 'ng-redux';
import { scrollToElement } from '../../../vendors/ew-angularjs-utils/utils/scroll-to-top';
import { stateGo } from 'redux-ui-router';

import { CampsService } from '../camps.service';

export class CampFormComponentController {

  action: string;
  activeTab: number;
  form: ng.IFormController;
  get: Function;
  // FIXME: mock per mostrare qualcosa in test
  mockGuests: any[];
  hasError: any;
  model: any;
  resetModel: Function;
  router: any;
  save: Function;
  stateGo: Function;
  tabs: Array<any>;
  title: string;
  unsubscribe: Function;
  updateModel: Function;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private $timeout: ng.ITimeoutService,
    private hotkeys,
    private CampsService: CampsService,
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit() {
    this.title = (this.isEdit() ? 'Modifica ' : 'Aggiungi ') + 'campo';

    // Seleziona di default il primo tab
    this.activeTab = 0;
    this.tabs = ['doc_offerta', 'emails', 'doc_renter'];
    this.tabs.forEach((tab, index) => this._addTabsHotkeys(tab, index));

    // FIXME: rimuovere dopo test
    this.mockGuests = [
      { id: 1, nome: 'Elia', cognome: 'Gentili', arrivo: new Date(), partenza: new Date() },
      { id: 2, nome: 'Massimo', cognome: 'Frascati', arrivo: new Date(), partenza: new Date() },
      { id: 3, nome: 'Michele', cognome: 'Spina', arrivo: new Date(), partenza: new Date() },
      { id: 4, nome: 'Luca', cognome: 'Bottero', arrivo: new Date(), partenza: new Date() },
    ];
  }

  $onDestroy() {
    this.tabs.forEach((tab, index) => this._deleteTabsHotkeys(tab, index));
    this.unsubscribe();
  }

  isAdd() {
    return this.action === 'add';
  }

  isEdit() {
    return this.action === 'edit';
  }

  selectTab(tabName: string) {
    this.$timeout(() => {
      jQuery('#focused_input_' + tabName).focus();
      // this.$scope.$broadcast('SetFocus');
    }, 50);
  }

  saveAndStay() {
    this.submit(this.model, true);
  }

  submit(model, stay) {
    if (this.form.$valid) {
      return this.save(model)
        .then(() => this.get())
        .then(() => !stay ? this.stateGo('camps') : null)
        .then(() => this.CampsService.toaster.success('Campo salvato'));
    }

    this.CampsService.toaster.error('Sono presenti degli errori. Controlla e riprova.');
    const el: any = jQuery('#campform-dialog input.ng-invalid:first, select.ng-invalid:first');
    el.focus();
    scrollToElement(el, 80);
  }

  updateMarca(event) {
    return this.updateModel({
      name: event.name,
      value: event.value.value,
    })
  }

  /**
   * PRIVATES
   */

  private _addTabsHotkeys(tab, index) {
    this.hotkeys.add({
      combo: [`ctrl+${index + 1}`, `mod+${index + 1}`],
      description: `Seleziona tab "${tab}"`,
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: (e) => {
        e.preventDefault();
        this.activeTab = index;
      }
    });
  }

  private _deleteTabsHotkeys(tab, index) {
    this.hotkeys.del([`ctrl+${index + 1}`, `mod+${index + 1}`]);
  }

  private _mapStateToThis(state) {
    return this.CampsService.mapStateToThisForm()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.CampsService.mapDispatchToThisForm()(dispatch);
  };
}

import * as jQuery from 'jquery';
import ngRedux from 'ng-redux';
import { ModalService } from '../../../vendors/ew-angularjs-utils/components/modal/modal.service';
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
  hasError: any;
  resetModel: Function;
  router: any;
  save: Function;
  stateGo: Function;
  title: string;
  unsubscribe: Function;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private GuestsService: GuestsService,
    private ModalService: ModalService,
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

  submit(model) {
    if (this.form.$valid) {
      return this.save(model)
        .then(() => this.get())
        .then(() => this._dismissModal())
        .then(() => this.GuestsService.toaster.success('Utente salvato.'));
    }

    this.GuestsService.toaster.error('Sono presenti degli errori. Controlla e riprova.');
    const el: any = jQuery('#guestsform-dialog input.ng-invalid:first, select.ng-invalid:first');
    el.focus();
    scrollToElement(el, 80);
  }

  /**
   * PRIVATES
   */

  private _dismissModal() {
    this.ModalService.close('guestsForm');
  }

  private _mapStateToThis(state) {
    return this.GuestsService.mapStateToThisForm()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.GuestsService.mapDispatchToThisForm()(dispatch);
  };
}

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
} from '../rooms.selectors';

import { RoomsService } from '../rooms.service';

export class RoomsFormComponentController {

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
    private RoomsService: RoomsService,
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
        .then(() => this.RoomsService.toaster.success('Utente salvato.'));
    }

    this.RoomsService.toaster.error('Sono presenti degli errori. Controlla e riprova.');
    const el: any = jQuery('#roomsform-dialog input.ng-invalid:first, select.ng-invalid:first');
    el.focus();
    scrollToElement(el, 80);
  }

  /**
   * PRIVATES
   */

  private _dismissModal() {
    this.ModalService.close('roomsForm');
  }

  private _mapStateToThis(state) {
    return this.RoomsService.mapStateToThisForm()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.RoomsService.mapDispatchToThisForm()(dispatch);
  };
}

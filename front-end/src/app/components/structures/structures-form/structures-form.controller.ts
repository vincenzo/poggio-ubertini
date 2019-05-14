import * as jQuery from 'jquery';
import ngRedux from 'ng-redux';
import { LookupService } from './../../../vendors/ew-angularjs-utils/components/lookup/lookup.service';
import { ModalService } from '../../../vendors/ew-angularjs-utils/components/modal/modal.service';
import { scrollToElement } from '../../../vendors/ew-angularjs-utils/utils/scroll-to-top';
import { stateGo } from 'redux-ui-router';
import {
  getLookup,
  getModelForm,
  getModelState,
  getRouterState,
} from '../structures.selectors';

import { StructuresService } from '../structures.service';

export class StructuresFormComponentController {

  action: string;
  form: ng.IFormController;
  get: Function;
  getLookup: Function;
  hasError: any;
  resetModel: Function;
  router: any;
  save: Function;
  stateGo: Function;
  title: string;
  unsubscribe: Function;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private StructuresService: StructuresService,
    private ModalService: ModalService,
    private LookupService: LookupService,
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit() {
    this.title = (this.isEdit() ? 'Modifica ' : 'Aggiungi ') + 'struttura';
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
        .then(() => this.getLookup())
        .then(() => this._dismissModal())
        .then(() => this.StructuresService.toaster.success('Struttura salvata'));
    }

    this.StructuresService.toaster.error('Sono presenti degli errori. Controlla e riprova.');
    const el: any = jQuery('#structuresform-dialog input.ng-invalid:first, select.ng-invalid:first');
    el.focus();
    scrollToElement(el, 80);
  }

  /**
   * PRIVATES
   */

  private _dismissModal() {
    this.ModalService.close('structuresForm');
  }

  private _mapStateToThis(state) {
    return this.StructuresService.mapStateToThisForm()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.StructuresService.mapDispatchToThisForm({
      getLookup: () => dispatch(this.LookupService.getLookup()),
    })(dispatch);
  };
}

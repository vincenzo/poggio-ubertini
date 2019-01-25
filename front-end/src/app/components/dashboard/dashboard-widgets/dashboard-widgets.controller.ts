import * as jQuery from 'jquery';
import { EventEmitter, IEventEmitter } from './../../../vendors/ew-angularjs-utils/common/event-emitter';
import _filter = require('lodash/filter');

export class DashboardWidgetsController {

  /**
   * Bindings
   */
  cars;
  carsIsLoading;
  contracts;
  contractsIsLoading;
  notes: any;
  onPaymentsRegister;
  payments;
  paymentsIsLoading;
  onSaveNotes;

  /**
   * Properties
   */
  selectAllValue;

  constructor(
    private EventEmitter: IEventEmitter,
  ) {
    'ngInject';
  }

  $onInit(): void {
    this.selectAllValue = false;
  }

  arePaymentsChecked(payments) {
    const checkedPayments = _filter(payments, { registrato: true });
    return checkedPayments.length;
  }

  hasUnbalance(sbilancio) {
    if (sbilancio !== 0) {
      return true;
    }
    return false;
  }

  registerPayments(payments) {
    const checkedPayments =
      _filter(payments, { registrato: true })
        .reduce((acc: Array<any>, curr) => {
          acc.push(curr.id);
          return acc;
        }, []);

    jQuery('#checkbox-select-all').prop('checked', false);

    this.onPaymentsRegister({ ids: checkedPayments });
  }

  saveNotes() {
    this.onSaveNotes(this.EventEmitter(({ notes: this.notes })));
  }

  selectAll(value) {
    this.payments = this.payments.reduce((acc, curr) => {
      acc.push(this.togglePayment(curr, value));
      return acc;
    }, []);
  }

  togglePayment(payment, value) {
    if (
      !payment.contract ||
      !payment.contract.intestatario ||
      !payment.contract.intestatario.ragione_sociale
    ) {
      value = false;
    }
    return Object.assign({}, payment, { registrato: value });
  }

  updateNotes(event) {
    this.notes = event.value;
  }
}

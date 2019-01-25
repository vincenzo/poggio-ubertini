import * as angular from 'angular';
import { DashboardWidgetsController } from './dashboard-widgets.controller';

import './dashboard-widgets.scss';

export const DashboardWidgetsComponent: ng.IComponentOptions = {
  bindings: {
    cars: '<',
    carsIsLoading: '<',
    contracts: '<',
    contractsIsLoading: '<',
    notes: '<',
    onPaymentsRegister: '&',
    payments: '<',
    paymentsIsLoading: '<',
    onSaveNotes: '&',
  },
  controller: DashboardWidgetsController,
  templateUrl: require('./dashboard-widgets.html'),
};
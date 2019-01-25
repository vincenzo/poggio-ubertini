import * as angular from 'angular';

import { DashboardComponent } from './dashboard.component';
import { DashboardWidgetsComponent } from './dashboard-widgets/dashboard-widgets.component';

import { AppService } from '../../common/app/app.service';
import { DashboardService } from './dashboard.service';
import { StateProvider } from '@uirouter/angularjs';

export const DashboardModule = angular
  .module('common.dashboard', ['ui.router'])
  .config(($stateProvider: StateProvider) => {
    'ngInject';

    $stateProvider
      .state('dashboard', {
        parent: 'app',
        url: '/dashboard',
        component: 'dashboard',
        data: {
          form: false,
          requiredAuth: true,
          roles: {
            admin: true,
          },
        }
      });
  })
  .component('dashboard', DashboardComponent)
  .component('dashboardWidgets', DashboardWidgetsComponent)
  .service('DashboardService', DashboardService)
  .name;

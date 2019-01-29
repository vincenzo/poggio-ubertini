import * as angular from 'angular';

import { ReservationsComponent } from './reservations.component';
import { ReservationsFormComponent } from './reservations-form/reservations-form.component';

import { AppService } from '../../common/app/app.service';
import { ReservationsService } from './reservations.service';
import { StateProvider } from '@uirouter/angularjs';

import { ReservationsFiltersModule } from './reservations-filters/reservations-filters.module';

export const ReservationsModule = angular.module('components.reservations', [
  'ui.router',
  ReservationsFiltersModule,
])
  .config(($stateProvider: StateProvider) => {
    'ngInject';

    $stateProvider
      .state('reservations', {
        parent: 'app',
        url: '/reservations',
        component: 'reservations',
        resolve: {
          reservations: ($ngRedux, ReservationsService: ReservationsService) => {
            'ngInject';
            return $ngRedux.dispatch(ReservationsService.get());
          }
        },
        data: {
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
      })
      .state('reservations.add', {
        url: '/add',
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: 'reservationsForm',
            preCloseCallback: (value) => ModalService.preCloseCallbackDefault(value, 'reservations'),
            template: '<reservations-form action="add"></reservations-form>',
          });
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, ReservationsService: ReservationsService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('reservations'));
            return $ngRedux.dispatch(ReservationsService.getFormData(null));
          }
        },
        data: {
          form: true,
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
      })
      .state('reservations.edit', {
        url: '/edit/:id',
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: 'reservationsForm',
            preCloseCallback: (value) => ModalService.preCloseCallbackDefault(value, 'reservations'),
            template: '<reservations-form action="edit"></reservations-form>',
          });
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, ReservationsService: ReservationsService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('reservations'));
            return $ngRedux.dispatch(ReservationsService.getFormData($stateParams.id));
          }
        },
        data: {
          form: true,
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
      });
  })
  .component('reservations', ReservationsComponent)
  .component('reservationsForm', ReservationsFormComponent)
  .service('ReservationsService', ReservationsService)
  .name;

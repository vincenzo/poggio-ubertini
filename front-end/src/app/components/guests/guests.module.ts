import * as angular from 'angular';

import { GuestsComponent } from './guests.component';
import { GuestsFormComponent } from './guests-form/guests-form.component';

import { AppService } from '../../common/app/app.service';
import { GuestsService } from './guests.service';
import { StateProvider } from '@uirouter/angularjs';

import { GuestsFiltersModule } from './guests-filters/guests-filters.module';

export const GuestsModule = angular.module('components.guests', [
  'ui.router',
  GuestsFiltersModule,
])
  .config(($stateProvider: StateProvider) => {
    'ngInject';

    $stateProvider
      .state('guests', {
        parent: 'app',
        url: '/guests',
        component: 'guests',
        resolve: {
          guests: ($ngRedux, GuestsService: GuestsService) => {
            'ngInject';
            return $ngRedux.dispatch(GuestsService.get());
          }
        },
        data: {
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
      })
      .state('guests.add', {
        url: '/add',
        views: {
          '@app': {
            component: 'guestsForm',
          },
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, GuestsService: GuestsService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('guests'));
            return $ngRedux.dispatch(GuestsService.getFormData(null));
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
      .state('guests.edit', {
        url: '/edit/:id',
        views: {
          '@app': {
            component: 'guestsForm',
          },
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, GuestsService: GuestsService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('guests'));
            return $ngRedux.dispatch(GuestsService.getFormData($stateParams.id));
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
  .component('guests', GuestsComponent)
  .component('guestsForm', GuestsFormComponent)
  .service('GuestsService', GuestsService)
  .name;

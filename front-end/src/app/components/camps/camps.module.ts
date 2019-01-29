import * as angular from 'angular';

import { CampsComponent } from './camps.component';
import { CampsFormComponent } from './camps-form/camps-form.component';

import { AppService } from '../../common/app/app.service';
import { CampsService } from './camps.service';
import { StateProvider } from '@uirouter/angularjs';

import { CampsFiltersModule } from './camps-filters/camps-filters.module';

export const CampsModule = angular.module('components.camps', [
  'ui.router',
  CampsFiltersModule,
])
  .config(($stateProvider: StateProvider) => {
    'ngInject';

    $stateProvider
      .state('camps', {
        parent: 'app',
        url: '/camps',
        component: 'camps',
        resolve: {
          camps: ($ngRedux, CampsService: CampsService) => {
            'ngInject';
            return $ngRedux.dispatch(CampsService.get());
          }
        },
        data: {
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
      })
      .state('camps.add', {
        url: '/add',
        views: {
          '@app': {
            component: 'campsForm',
          },
        },
        resolve: {
          action: () => 'add',
          data: ($ngRedux, AppService: AppService, CampsService: CampsService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('camps'));
            return $ngRedux.dispatch(CampsService.getFormData(null));
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
      .state('camps.edit', {
        url: '/edit/:id',
        views: {
          '@app': {
            component: 'campsForm',
          },
        },
        resolve: {
          action: () => 'edit',
          data: ($ngRedux, AppService: AppService, CampsService: CampsService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('camps'));
            return $ngRedux.dispatch(CampsService.getFormData($stateParams.id));
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
  .component('camps', CampsComponent)
  .component('campsForm', CampsFormComponent)
  .service('CampsService', CampsService)
  .name;

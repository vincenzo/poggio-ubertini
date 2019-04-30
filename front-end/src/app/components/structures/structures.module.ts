import * as angular from 'angular';

import { StructuresComponent } from './structures.component';
import { StructuresFormComponent } from './structures-form/structures-form.component';

import { AppService } from '../../common/app/app.service';
import { StructuresService } from './structures.service';
import { StateProvider } from '@uirouter/angularjs';

import { StructuresFiltersModule } from './structures-filters/structures-filters.module';

export const StructuresModule = angular.module('components.structures', [
  'ui.router',
  StructuresFiltersModule,
])
  .config(($stateProvider: StateProvider) => {
    'ngInject';

    $stateProvider
      .state('structures', {
        parent: 'app',
        url: '/structures',
        component: 'structures',
        resolve: {
          structures: ($ngRedux, StructuresService: StructuresService) => {
            'ngInject';
            return $ngRedux.dispatch(StructuresService.get());
          }
        },
        data: {
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
      })
      .state('structures.add', {
        url: '/add',
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: 'structuresForm',
            className: 'ngdialog-xsmall',
            preCloseCallback: (value) => ModalService.preCloseCallbackDefault(value, 'structures'),
            template: '<structures-form action="add"></structures-form>',
          });
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, StructuresService: StructuresService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('structures'));
            return $ngRedux.dispatch(StructuresService.getFormData(null));
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
      .state('structures.edit', {
        url: '/edit/:id',
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: 'structuresForm',
            className: 'ngdialog-xsmall',
            preCloseCallback: (value) => ModalService.preCloseCallbackDefault(value, 'structures'),
            template: '<structures-form action="edit"></structures-form>',
          });
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, StructuresService: StructuresService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('structures'));
            return $ngRedux.dispatch(StructuresService.getFormData($stateParams.id));
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
  .component('structures', StructuresComponent)
  .component('structuresForm', StructuresFormComponent)
  .service('StructuresService', StructuresService)
  .name;

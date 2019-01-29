import * as angular from 'angular';

import { RoomsComponent } from './rooms.component';
import { RoomsFormComponent } from './rooms-form/rooms-form.component';

import { AppService } from '../../common/app/app.service';
import { RoomsService } from './rooms.service';
import { StateProvider } from '@uirouter/angularjs';

import { RoomsFiltersModule } from './rooms-filters/rooms-filters.module';

export const RoomsModule = angular.module('components.rooms', [
  'ui.router',
  RoomsFiltersModule,
])
  .config(($stateProvider: StateProvider) => {
    'ngInject';

    $stateProvider
      .state('rooms', {
        parent: 'app',
        url: '/rooms',
        component: 'rooms',
        resolve: {
          rooms: ($ngRedux, RoomsService: RoomsService) => {
            'ngInject';
            return $ngRedux.dispatch(RoomsService.get());
          }
        },
        data: {
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
      })
      .state('rooms.add', {
        url: '/add',
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: 'roomsForm',
            preCloseCallback: (value) => ModalService.preCloseCallbackDefault(value, 'rooms'),
            template: '<rooms-form action="add"></rooms-form>',
          });
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, RoomsService: RoomsService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('rooms'));
            return $ngRedux.dispatch(RoomsService.getFormData(null));
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
      .state('rooms.edit', {
        url: '/edit/:id',
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: 'roomsForm',
            preCloseCallback: (value) => ModalService.preCloseCallbackDefault(value, 'rooms'),
            template: '<rooms-form action="edit"></rooms-form>',
          });
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, RoomsService: RoomsService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('rooms'));
            return $ngRedux.dispatch(RoomsService.getFormData($stateParams.id));
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
  .component('rooms', RoomsComponent)
  .component('roomsForm', RoomsFormComponent)
  .service('RoomsService', RoomsService)
  .name;

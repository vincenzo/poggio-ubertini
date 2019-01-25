import * as angular from 'angular';

import { UsersComponent } from './users.component';
import { UsersFormComponent } from './users-form/users-form.component';

import { AppService } from '../../common/app/app.service';
import { UsersService } from './users.service';
import { StateProvider } from '@uirouter/angularjs';

import { UsersFiltersModule } from './users-filters/users-filters.module';

export const UsersModule = angular.module('components.users', [
  'ui.router',
  UsersFiltersModule,
])
  .config(($stateProvider: StateProvider) => {
    'ngInject';

    $stateProvider
      .state('users', {
        parent: 'app',
        url: '/users',
        component: 'users',
        resolve: {
          users: ($ngRedux, UsersService: UsersService) => {
            'ngInject';
            return $ngRedux.dispatch(UsersService.get());
          }
        },
        data: {
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
      })
      .state('users.add', {
        url: '/add',
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: 'usersForm',
            preCloseCallback: (value) => ModalService.preCloseCallbackDefault(value, 'users'),
            template: '<users-form action="add"></users-form>',
          });
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, UsersService: UsersService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('users'));
            return $ngRedux.dispatch(UsersService.getFormData(null));
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
      .state('users.edit', {
        url: '/edit/:id',
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: 'usersForm',
            preCloseCallback: (value) => ModalService.preCloseCallbackDefault(value, 'users'),
            template: '<users-form action="edit"></users-form>',
          });
        },
        resolve: {
          data: ($ngRedux, AppService: AppService, UsersService: UsersService, $stateParams) => {
            'ngInject';
            $ngRedux.dispatch(AppService.setActiveForm('users'));
            return $ngRedux.dispatch(UsersService.getFormData($stateParams.id));
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
  .component('users', UsersComponent)
  .component('usersForm', UsersFormComponent)
  .service('UsersService', UsersService)
  .name;

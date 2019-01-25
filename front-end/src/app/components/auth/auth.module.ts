import * as toastr from 'angular-toastr';
import * as angular from 'angular';
import uiRouter, { StateProvider, UrlRouterProvider } from '@uirouter/angularjs';

import { authFormComponent } from './auth-form/auth-form.component';
import { loginComponent } from './login/login.component';
import { registerComponent } from './register/register.component';
import { AuthService } from './auth.service';

import './auth.scss';

export const AuthModule = angular
  .module('components.auth', [
    uiRouter,
    'angular-jwt',
  ])
  .component('authForm', authFormComponent)
  .component('login', loginComponent)
  .component('register', registerComponent)
  .service('AuthService', AuthService)
  .config(($stateProvider: StateProvider,
    $urlRouterProvider: UrlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/app');

    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        template: '<div ui-view></div>'
      })
      .state('auth.login', {
        url: '/login',
        component: 'login'
      })
      .state('auth.register', {
        url: '/register',
        component: 'register'
      });
  })
  .run(($transitions, $state, AuthService: AuthService, toastr: toastr.IToastrService) => {
    'ngInject';

    /**
     * Transizione eseguita ogni volta che si inizia il passaggio ad una route
     * con data { requiredAuth: true }.
     * Questa transizione verifica che l'utente sia loggato e che possa quindi
     * accedere alla route che richiede l'autenticazione.
     */
    $transitions.onBefore({
      to: state => !!(state.data && state.data.requiredAuth)
    }, () => {
      if (!AuthService.isAuthenticated()) {
        toastr.error(`Devi effettuare l'accesso.`, 'Errore');
        return $state.target('auth.login');
      };
    });

    /**
     * Transizione eseguita ogni volta che si inizia il passaggio ad una route
     * con data { roles: [...lista dei ruoli] }.
     * Questa transizione verifica che l'utente abbia l'autorizzazione ad accedere
     * ad una specifica route, ovvero che l'utente possieda un ruolo abilitato.
     */
    $transitions.onBefore({
      to: state => !!(state.data && state.data.roles)
    }, transition => {
      if (!AuthService.isAuthorized(transition.to().data.roles)) {
        toastr.error('Non hai il permesso per accedere a questa pagina.', 'Errore');
        return $state.target('app');
      };
    });

    /**
     * Transizione eseguita ogni volta che si cerca di caricare una route di authenticazione.
     * Verifica se l'utente è già loggato, ed in tal caso impedisce il caricamento
     * della route e mostra un toastr di errore.
     */
    $transitions.onBefore({
      to: 'auth.*'
    }, () => {
      if (AuthService.isAuthenticated()) {
        toastr.error('Sei già autenticato.', 'Errore');
        return $state.target('app');
      }
    });

  })
  .name;

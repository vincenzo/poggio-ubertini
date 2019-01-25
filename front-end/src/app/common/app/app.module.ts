import * as angular from 'angular';
import uiRouter, { StateProvider, StateService, UrlRouterProvider } from '@uirouter/angularjs';
import { cfpLoadingBar } from 'angular-loading-bar';
import ngRedux from 'ng-redux';
import * as hash from 'object-hash';
import { scrollToTop } from '../../vendors/ew-angularjs-utils/utils/scroll-to-top';

import { APP } from './app.constants';
import { appComponent } from './app.component';

import { AppService } from './app.service';
import { LookupService } from '../../vendors/ew-angularjs-utils/components/lookup/lookup.service';

// Include il css necessario per la loading bar
import 'angular-loading-bar/build/loading-bar.css';
import 'ng-dialog/css/ngDialog.css';

export const AppModule = angular
  .module('common.app', [
    uiRouter,
    'angular-loading-bar',
    'daterangepicker',
    'ngDialog',
    'ngQuill',
    'toastr',
  ])
  .component('app', appComponent)
  .service('AppService', AppService)
  .run(($ngRedux: ngRedux.INgRedux,
    $state: StateService,
    $transitions: any,
    cfpLoadingBar: cfpLoadingBar) => {
    'ngInject';

    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);

    $transitions.onSuccess({}, transition => {

      const destinationName = transition.$to().name;
      const startingName = transition.$from().name;
      // console.log('destinationName', destinationName);
      // console.log('startingName', startingName);

      const isRouteChildOfDestination = startingName.indexOf(destinationName) > -1;
      // console.log('isRouteChildOfDestination', isRouteChildOfDestination);

      const data = transition.$to().data;
      const scrollToTopParam = !data || data.scrollToTop === undefined ? false : Boolean(data.scrollToTop);

      if (!scrollToTopParam || isRouteChildOfDestination) {
        return;
      }

      scrollToTop();
    });

    /**
     * Transizione eseguita ogni volta che si inizia il passaggio ad un'altra
     * route, partendo da una route con data { form: true }.
     * Questa transizione verifica che gli hash, iniziale ed attuale, siano uguali,
     * altrimentri mostra la confirm dialog.
     * Evita inoltre di mostrare la confirm dialog se si sta passando ad una route
     * figlia. Ad esempio se siamo su clients.edit e passiamo su clients.edit.renters.add
     * la modal non viene mostrata.
     */
    $transitions.onStart({
      from: state => !!(state.data && state.data.form)
    }, (transition) => {

      const destinationName = transition.$to().name;
      const startingName = transition.$from().name;
      // console.log('destinationName', destinationName);
      // console.log('startingName', startingName);

      const isRouteParentOfDestination = destinationName.indexOf(startingName) > -1;
      // console.log('isRouteParentOfDestination', isRouteParentOfDestination);

      // Controllo se ci sono modifiche al form solo se sto andando verso una rout che non è figlia di quella attuale
      // se sono su un contratto ed apro una modal per modificare qualcosa entrando in una route figlia, non ha senso
      // mostrare il dialog per chiedere se si vuole uscire senza modificare
      if (!isRouteParentOfDestination) {
        const state = $ngRedux.getState();
        const activeForm = state.app.toJS().activeForm;
        // console.log('activeForm', activeForm);

        if (!activeForm) {
          throw new Error('Imposta il form attivo sulla route!');
        }

        const currentModel = state[activeForm].toJS();
        // console.log('currentModel', currentModel);

        const form = currentModel.form;
        // console.log('form', form);

        const { currentHash, initialHash } = form;
        // console.log('currentHash', currentHash);
        // console.log('initialHash', initialHash);

        if (currentHash !== initialHash) {
          var answer = confirm('Uscire senza salvare?')
          if (!answer) {
            cfpLoadingBar.complete();
            transition.abort();
          }
        }
      }
    });
  })
  .config((ngDialogProvider: any, $stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider, toastrConfig) => {
    'ngInject';

    ngDialogProvider.setDefaults({
      controllerAs: '$ctrl',
      plain: true,
      closeByNavigation: true,
    });

    ngDialogProvider.setOpenOnePerName(true);

    $stateProvider
      .state('app', {
        redirectTo: 'camps',
        url: '/app',
        data: {
          requiredAuth: true,
          roles: {
            admin: true,
          },
        },
        component: 'app',
        resolve: {
          lookup: ($ngRedux, $state, LookupService: LookupService) => {
            'ngInject';
            return $ngRedux.dispatch(LookupService.getLookup())
              .catch(err => $state.go('app') && Promise.reject(err));
          }
        }
      });

    angular.extend(toastrConfig, {
      timeOut: 2000,
      allowHtml: true,
    });
  })
  .name;

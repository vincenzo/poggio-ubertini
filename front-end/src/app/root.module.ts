// import 'cleave.js/dist/cleave-angular.min';
// import 'cleave.js/dist/addons/cleave-phone.it';
import * as angular from 'angular';
import * as angularLadda from 'angular-ladda';
import * as moment from 'moment';
import ngRedux from 'ng-redux';
import ngReduxUiRouter from 'redux-ui-router';
import { rootReducer  } from './root.reducer';
import { RootComponent  } from './root.component';
import { CommonModule } from './common/common.module';
import { ComponentsModule } from './components/components.module';
import { isProd, middlewares, enhancers } from './root.utils';
import { AuthService } from './components/auth/auth.service';
import { VendorsModule } from './vendors/vendors.module';

// import 'ng-file-upload/dist/ng-file-upload-shim'; // needed to support
// import 'ng-file-upload';

// Prima le dipendenze, per ultimo il nostro CSS
import '../sass/styles.scss';

export const RootModule = angular
  .module('root', [
    CommonModule,
    ComponentsModule,
    VendorsModule,
    'cfp.hotkeys',
    'cleave.js',
    'dndLists',
    'ngAnimate',
    'ngFileUpload',
    'ngMessages',
    'ngSanitize',
    'ngTagsInput',
    'nl2br',
    'ui.bootstrap',
    'ui.select',
    angularLadda,
    ngRedux,
    ngReduxUiRouter,
  ])
  .component('root', RootComponent)
  .config(($compileProvider: ng.ICompileProvider,
    $httpProvider: ng.IHttpProvider,
    jwtOptionsProvider,
    $ngReduxProvider: ngRedux.INgReduxProvider,
    cfpLoadingBarProvider) => {
    'ngInject';

    $ngReduxProvider.createStoreWith(
      rootReducer,
      middlewares,
      enhancers
    );

    if (isProd()) {
      $compileProvider.debugInfoEnabled(false);
      $compileProvider.commentDirectivesEnabled(false);
      $compileProvider.cssClassDirectivesEnabled(false);
    }

    jwtOptionsProvider.config({
      tokenGetter: (AuthService: AuthService) => {
        'ngInject';
        return AuthService.getToken();
      },
      whiteListedDomains: [
        'poggioubertini.entheosweb.it',
        'accesso.poggioubertini.it',
        'localhost',
      ]
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    $httpProvider.useApplyAsync(true);

    cfpLoadingBarProvider.includeSpinner = false;
  })
  .run(() => {
    'ngInject';

    moment.locale('it');

    moment.updateLocale('it', {
      'calendar': {
        'sameElse': 'DD/MM/YYYY h:mm'
      }
    });
  });

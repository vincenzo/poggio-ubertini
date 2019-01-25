import { StateService } from '@uirouter/core';
import * as jwt from 'angular-jwt';
import * as angular from 'angular';
import * as moment from 'moment';
import ngRedux from 'ng-redux';

import { AuthService } from '../../components/auth/auth.service';

export class AppController {

  auth: any;
  logout: Function;
  refreshToken: Function;
  unsubscribe: Function;

  constructor(
    private $document: ng.IDocumentService,
    private $ngRedux: ngRedux.INgRedux,
    private $rootScope: ng.IScope,
    private $window,
    private $state: StateService,
    private AuthService: AuthService,
    private jwtHelper: jwt.IJwtHelper) {
    'ngInject';

    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit() {
    this.$document.on('click', this.documentClick);

    const token = this.auth.token;
    const date = moment(this.jwtHelper.getTokenExpirationDate(token));
    const next5Days = moment().add(5, 'days');

    if (date.isBefore(next5Days)) {
      this.refreshToken();
    }

    // TODO: togliere commento in prod
    // this.$window.onbeforeunload = this.confirmExit;

    // this.$state.go('clients');
  }

  $onDestroy() {
    this.$document.off('click');
    this.unsubscribe();
  }

  documentClick = (event) => {
    this.$rootScope.$broadcast('document.click');
  }

  logoutAndRedirect() {
    this.logout();
    this.$state.go('auth.login');
  };

  confirmExit = () => {
    return 'Vuoi uscire da questo sito? Le modifiche apportate potrebbero non essere salvate.';
  };

  /**
   * PRIVATES
   */

  private _mapStateToThis = (state) => ({
    auth: state.auth.toJS(),
    uploads: state.uploads.toJS(),
  });

  private _mapDispatchToThis = dispatch => ({
    logout: () => dispatch(this.AuthService.logout()),
    refreshToken: () => dispatch(this.AuthService.refreshToken()),
  });
}

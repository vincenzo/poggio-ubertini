import * as jwt from 'angular-jwt';
import ngRedux from 'ng-redux';
import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';
import {
  login,
  logout,
  refreshToken,
} from './auth.actions';

export class AuthService {

  auth: any;
  authData: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private EwServerService: EwServerService,
    private jwtHelper: jwt.IJwtHelper,
  ) {
    'ngInject';
  }

  getToken = () => {
    const state = this.$ngRedux.getState();
    const auth = state.auth.toJS();
    return auth.token || null;
  };

  isAuthenticated = () => {
    const token = this.getToken();
    return !!(token && !this.jwtHelper.isTokenExpired(token));
  };

  isAuthorized = (roles: any) => {
    const state = this.$ngRedux.getState();
    const auth = state.auth.toJS();
    return roles[auth.user.role];
  };

  login = user => {
    return login(this.EwServerService.post('/users/token', user).then(response => response.data));
  };

  logout = () => {
    return logout();
  };

  refreshToken = () => {
    return refreshToken(this.EwServerService.get('/users/refreshToken').then(response => response.data));
  };

  requireAuthentication = () => {
    return Promise.resolve(false);
  };

  /**
   * PRIVATES
   */
}

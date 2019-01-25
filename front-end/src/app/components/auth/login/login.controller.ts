import ngRedux from 'ng-redux';
import { StateService } from '@uirouter/core';
import { AuthService } from '../auth.service';
import { User } from '../../../common/model/user';
import { LookupService } from '../../../vendors/ew-angularjs-utils/components/lookup/lookup.service';

export class LoginController {

  auth: any;
  error: string;
  login: Function;
  unsubscribe: Function;
  user: any;

  constructor(private AuthService: AuthService,
    private $ngRedux: ngRedux.INgRedux,
    private $state: StateService,
    private LookupService: LookupService) {
    'ngInject';

    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this), this._mapDispatchToThis.bind(this))(this);
  }

  $onInit() {
    this.error = null;
    this.user = new User();
  };

  $onDestroy() {
    this.unsubscribe();
  }

  loginUser(event) {
    this.login(event.user).then(() => {
      if (this.auth.user.role === 'officina') {
        return this.$state.go('garages');
      }
      if (this.auth.user.role === 'commercialista') {
        return this.$state.go('cashflows');
      }
      return this.$state.go('app');
    });
  };

  /**
   * PRIVATES
   */

  private _mapDispatchToThis(dispatch) {
    return {
      login: user => dispatch(this.AuthService.login(user)),
    };
  }

  private _mapStateToThis(state) {
    return {
      auth: state.auth.toJS(),
    };
  }
};
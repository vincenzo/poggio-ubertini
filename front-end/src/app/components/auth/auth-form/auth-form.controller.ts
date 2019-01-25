import * as angular from 'angular';
import { IEventEmitter } from '../../../vendors/ew-angularjs-utils/common/event-emitter';

import { AuthService } from './../auth.service';

export class AuthFormController {

  onSubmit: Function;
  user: any;

  constructor(
    private AuthService: AuthService,
    private EventEmitter: IEventEmitter
  ) {
    'ngInject';
  }

  $onChanges(changes) {
    if (changes.user) {
      this.user = angular.copy(this.user);
    }
  };

  isAuth() {
    return this.AuthService.isAuthenticated();
  }

  submitForm() {
    this.onSubmit(
      this.EventEmitter({
        user: this.user
      }
    ));
  };
}

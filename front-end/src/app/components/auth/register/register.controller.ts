import * as angular from 'angular';
import { User } from '../../../common/model/user';

export class RegisterController {

  error: string;
  user: any;

  constructor(private AuthService, private $state) {
    'ngInject';
  }

  $onInit() {
    this.error = null;
    this.user = new User();
  };

  createUser(event) {
    return this.AuthService.register(event.user)
      .then(() => this.$state.go('app'))
      .then((nul, reason) => this.error = reason.message);
  };
}

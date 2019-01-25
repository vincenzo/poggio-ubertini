import * as angular from 'angular';

import { LoginController } from './login.controller';

export const loginComponent: ng.IComponentOptions = {
  templateUrl: require('./login.html'),
  controller: LoginController,
};

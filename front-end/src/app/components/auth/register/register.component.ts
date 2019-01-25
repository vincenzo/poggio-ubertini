import * as angular from 'angular';

import { RegisterController } from './register.controller';

export const registerComponent: ng.IComponentOptions = {
  templateUrl: require('./register.html'),
  controller: RegisterController,
};

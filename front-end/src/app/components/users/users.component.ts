import { UsersComponentController } from './users.controller';

import './users.scss';

export const UsersComponent: ng.IComponentOptions = {
  controller: UsersComponentController,
  templateUrl: require('./users.html'),
}

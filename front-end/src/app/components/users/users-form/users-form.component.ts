import { UsersFormComponentController } from './users-form.controller';

export const UsersFormComponent = {
  bindings: {
    action: '@',
  },
  controller: UsersFormComponentController,
  templateUrl: require('./users-form.html'),
}

import { AuthFormController } from './auth-form.controller';

export const authFormComponent: ng.IComponentOptions = {
  bindings: {
    auth: '<',
    isLoading: '<',
    user: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: require('./auth-form.html'),
  controller: AuthFormController,
};


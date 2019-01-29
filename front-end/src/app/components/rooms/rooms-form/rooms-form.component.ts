import { RoomsFormComponentController } from './rooms-form.controller';

export const RoomsFormComponent = {
  bindings: {
    action: '@',
  },
  controller: RoomsFormComponentController,
  templateUrl: require('./rooms-form.html'),
}

import { GuestsFormComponentController } from './guests-form.controller';

export const GuestsFormComponent = {
  bindings: {
    action: '@',
  },
  controller: GuestsFormComponentController,
  templateUrl: require('./guests-form.html'),
}

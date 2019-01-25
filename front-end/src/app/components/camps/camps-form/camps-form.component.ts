import { CampsFormComponentController } from './camps-form.controller';

export const CampsFormComponent = {
  bindings: {
    action: '@',
  },
  controller: CampsFormComponentController,
  templateUrl: require('./camps-form.html'),
}

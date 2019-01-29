import { CampsFormComponentController } from './camps-form.controller';

import './camps-form.scss';

export const CampsFormComponent = {
  bindings: {
    action: '@',
  },
  controller: CampsFormComponentController,
  templateUrl: require('./camps-form.html'),
}

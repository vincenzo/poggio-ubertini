import { CampFormComponentController } from './camp-form.controller';

import './camp-form.scss';

export const CampFormComponent = {
  bindings: {
    action: '@',
  },
  controller: CampFormComponentController,
  templateUrl: require('./camp-form.html'),
}

import { CampGuestsComponentController } from './camp-guests.controller';

import './camp-guests.scss';

export const CampGuestsComponent = {
  bindings: {
    model: '<',
  },
  controller: CampGuestsComponentController,
  templateUrl: require('./camp-guests.html'),
}

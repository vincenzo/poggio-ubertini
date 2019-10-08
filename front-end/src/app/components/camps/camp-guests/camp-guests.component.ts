import { CampGuestsComponentController } from './camp-guests.controller';

import './camp-guests.scss';

export const CampGuestsComponent = {
  bindings: {
    reservations: '<',
  },
  controller: CampGuestsComponentController,
  templateUrl: require('./camp-guests.html'),
}

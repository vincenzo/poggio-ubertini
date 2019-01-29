import { GuestsComponentController } from './guests.controller';

import './guests.scss';

export const GuestsComponent: ng.IComponentOptions = {
  controller: GuestsComponentController,
  templateUrl: require('./guests.html'),
}

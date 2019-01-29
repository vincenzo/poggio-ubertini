import { ReservationsComponentController } from './reservations.controller';

import './reservations.scss';

export const ReservationsComponent: ng.IComponentOptions = {
  controller: ReservationsComponentController,
  templateUrl: require('./reservations.html'),
}

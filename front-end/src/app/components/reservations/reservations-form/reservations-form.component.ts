import { ReservationsFormComponentController } from './reservations-form.controller';

export const ReservationsFormComponent = {
  bindings: {
    action: '@',
  },
  controller: ReservationsFormComponentController,
  templateUrl: require('./reservations-form.html'),
}

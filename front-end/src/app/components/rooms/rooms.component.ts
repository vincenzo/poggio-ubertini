import { RoomsComponentController } from './rooms.controller';

import './rooms.scss';

export const RoomsComponent: ng.IComponentOptions = {
  controller: RoomsComponentController,
  templateUrl: require('./rooms.html'),
}

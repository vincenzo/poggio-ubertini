import { CampAssignRoomComponentController } from './camp-assign-room.controller';

import './camp-assign-room.scss';

export const CampAssignRoomComponent = {
  bindings: {
    reservations: '<',
    rooms: '<',
  },
  controller: CampAssignRoomComponentController,
  templateUrl: require('./camp-assign-room.html'),
}

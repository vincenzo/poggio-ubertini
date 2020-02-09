import { combineReducers } from "redux";

import { AppReducer } from "./common/app/app.reducer";
import { AuthReducer } from "./components/auth/auth.reducer";
import { CampsReducer } from "./components/camps/camps.reducer";
import { ConsuntivoReducer } from "./components/consuntivo/consuntivo.reducer";
import { DashboardReducer } from "./components/dashboard/dashboard.reducer";
import { GuestsReducer } from "./components/guests/guests.reducer";
import { IstatReducer } from "./components/istat/istat.reducer";
import { QuesturaReducer } from "./components/questura/questura.reducer";
import { ReportsReducer } from "./components/reports/reports.reducer";
import { ReservationsReducer } from "./components/reservations/reservations.reducer";
import { RoomsReducer } from "./components/rooms/rooms.reducer";
import { RoomsCalendarioReducer } from "./components/rooms-calendario/rooms-calendario.reducer";
import { StructuresReducer } from "./components/structures/structures.reducer";
import { StructureOccupancyReducer } from "./components/structure-occupancy/structure-occupancy.reducer";
import { TouristtaxReducer } from "./components/touristtax/touristtax.reducer";

import { LookupReducer } from "./vendors/ew-angularjs-utils/components/lookup/lookup.reducer";
import { UploadsReducer } from "./vendors/ew-angularjs-utils/components/uploads/uploads.reducer";
import { UsersReducer } from "./components/users/users.reducer";

import { router } from "redux-ui-router";

export const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  camps: CampsReducer,
  consuntivo: ConsuntivoReducer,
  dashboard: DashboardReducer,
  guests: GuestsReducer,
  istat: IstatReducer,
  lookup: LookupReducer,
  questura: QuesturaReducer,
  reports: ReportsReducer,
  reservations: ReservationsReducer,
  rooms: RoomsReducer,
  roomsCalendario: RoomsCalendarioReducer,
  router,
  structures: StructuresReducer,
  structureOccupancy: StructureOccupancyReducer,
  touristtax: TouristtaxReducer,
  uploads: UploadsReducer,
  users: UsersReducer
} as any);
// "as any" è un fix perché altrimenti typescript si arrabbia, controllare se
// si risolve aggiornando la lib redux

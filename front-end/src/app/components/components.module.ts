/**
 * Components Module
 *
 * A Component module is the container reference for all reusable components.
 * See above how we import Components and inject them into the Root module,
 * this gives us a single place to import all components for the app.
 *
 * These modules we require are decoupled from all other modules and thus
 * can be moved into any other application with ease.
 *
 */

import * as angular from "angular";

import { AuthModule } from "./auth/auth.module";
import { CampsModule } from "./camps/camps.module";
import { CitiesModule } from "./cities/cities.module";
import { ConsuntivoModule } from "./consuntivo/consuntivo.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { GuestsModule } from "./guests/guests.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { RoomsModule } from "./rooms/rooms.module";
import { RoomsCalendarioModule } from "./rooms-calendario/rooms-calendario.module";
import { StructuresModule } from "./structures/structures.module";
import { StructureOccupancyModule } from "./structure-occupancy/structure-occupancy.module";
import { UsersModule } from "./users/users.module";

export const ComponentsModule = angular.module("root.components", [
  AuthModule,
  CampsModule,
  CitiesModule,
  ConsuntivoModule,
  DashboardModule,
  GuestsModule,
  ReservationsModule,
  RoomsModule,
  RoomsCalendarioModule,
  StructuresModule,
  StructureOccupancyModule,
  UsersModule
]).name;

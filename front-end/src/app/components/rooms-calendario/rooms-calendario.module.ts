import * as angular from "angular";

import { RoomsCalendarioComponent } from "./rooms-calendario.component";

import { AppService } from "../../common/app/app.service";
import { RoomsCalendarioService } from "./rooms-calendario.service";
import { StateProvider } from "@uirouter/angularjs";

export const RoomsCalendarioModule = angular
  .module("components.rooms-calendario", ["ui.router"])
  .config(($stateProvider: StateProvider) => {
    "ngInject";

    $stateProvider.state("roomsCalendario", {
      parent: "app",
      url: "/rooms-calendario",
      component: "roomsCalendario",
      resolve: {
        roomsCalendario: (
          $ngRedux,
          RoomsCalendarioService: RoomsCalendarioService
        ) => {
          "ngInject";
          return $ngRedux.dispatch(RoomsCalendarioService.getCalendario(2020));
        }
      },
      data: {
        requiredAuth: true,
        roles: {
          admin: true
        }
      }
    });
  })
  .component("roomsCalendario", RoomsCalendarioComponent)
  .service("RoomsCalendarioService", RoomsCalendarioService).name;

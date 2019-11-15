import * as angular from "angular";

import { StructureOccupancyComponent } from "./structure-occupancy.component";

import { AppService } from "../../common/app/app.service";
import { StructureOccupancyService } from "./structure-occupancy.service";
import { StateProvider } from "@uirouter/angularjs";

export const StructureOccupancyModule = angular
  .module("components.structure-occupancy", ["ui.router"])
  .config(($stateProvider: StateProvider) => {
    "ngInject";

    $stateProvider.state("structureOccupancy", {
      parent: "app",
      url: "/structure-occupancy",
      component: "structureOccupancy",
      resolve: {
        structureOccupancy: (
          $ngRedux,
          StructureOccupancyService: StructureOccupancyService
        ) => {
          "ngInject";
          return $ngRedux.dispatch(StructureOccupancyService.getDisponibilita());
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
  .component("structureOccupancy", StructureOccupancyComponent)
  .service("StructureOccupancyService", StructureOccupancyService).name;

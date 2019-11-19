import * as angular from "angular";

import { ConsuntivoComponent } from "./consuntivo.component";

import { AppService } from "../../common/app/app.service";
import { ConsuntivoService } from "./consuntivo.service";
import { StateProvider } from "@uirouter/angularjs";

export const ConsuntivoModule = angular
  .module("components.consuntivo", ["ui.router"])
  .config(($stateProvider: StateProvider) => {
    "ngInject";

    $stateProvider.state("consuntivo", {
      parent: "app",
      url: "/consuntivo/:id",
      component: "consuntivo",
      resolve: {
        data: (
          $ngRedux,
          AppService: AppService,
          ConsuntivoService: ConsuntivoService,
          $stateParams
        ) => {
          "ngInject";
          $ngRedux.dispatch(AppService.setActiveForm("camps"));
          return $ngRedux.dispatch(
            ConsuntivoService.getFormData($stateParams.id)
          );
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
  .component("consuntivo", ConsuntivoComponent)
  .service("ConsuntivoService", ConsuntivoService).name;

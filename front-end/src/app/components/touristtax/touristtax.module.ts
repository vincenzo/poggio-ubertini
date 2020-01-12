import * as angular from "angular";

import { TouristtaxComponent } from "./touristtax.component";

import { AppService } from "../../common/app/app.service";
import { TouristtaxService } from "./touristtax.service";
import { StateProvider } from "@uirouter/angularjs";

export const TouristtaxModule = angular
  .module("components.touristtax", ["ui.router"])
  .config(($stateProvider: StateProvider) => {
    "ngInject";

    $stateProvider.state("touristtax", {
      parent: "app",
      url: "/touristtax",
      component: "touristtax",
      // resolve: {
      //   touristtax: ($ngRedux, TouristtaxService: TouristtaxService) => {
      //     "ngInject";
      //     return $ngRedux.dispatch(TouristtaxService.get());
      //   }
      // },
      data: {
        requiredAuth: true,
        roles: {
          admin: true
        }
      }
    });
  })
  .component("touristtax", TouristtaxComponent)
  .service("TouristtaxService", TouristtaxService).name;

import * as angular from "angular";

import { ReportsComponent } from "./reports.component";

import { AppService } from "../../common/app/app.service";
import { ReportsService } from "./reports.service";
import { StateProvider } from "@uirouter/angularjs";

export const ReportsModule = angular
  .module("components.reports", ["ui.router"])
  .config(($stateProvider: StateProvider) => {
    "ngInject";

    $stateProvider.state("reports", {
      parent: "app",
      url: "/reports",
      component: "reports",
      data: {
        requiredAuth: true,
        roles: {
          admin: true
        }
      }
    });
  })
  .component("reports", ReportsComponent)
  .service("ReportsService", ReportsService).name;

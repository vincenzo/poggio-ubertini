import * as angular from "angular";

import { IstatComponent } from "./istat.component";

import { AppService } from "../../common/app/app.service";
import { IstatService } from "./istat.service";

export const IstatModule = angular
  .module("components.istat", ["ui.router"])
  .component("istat", IstatComponent)
  .service("IstatService", IstatService).name;

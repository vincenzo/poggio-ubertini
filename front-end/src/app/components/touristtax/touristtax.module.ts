import * as angular from "angular";

import { TouristtaxComponent } from "./touristtax.component";

import { AppService } from "../../common/app/app.service";
import { TouristtaxService } from "./touristtax.service";

export const TouristtaxModule = angular
  .module("components.touristtax", ["ui.router"])
  .component("touristtax", TouristtaxComponent)
  .service("TouristtaxService", TouristtaxService).name;

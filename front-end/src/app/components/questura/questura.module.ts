import * as angular from "angular";

import { QuesturaComponent } from "./questura.component";

import { AppService } from "../../common/app/app.service";
import { QuesturaService } from "./questura.service";

export const QuesturaModule = angular
  .module("components.questura", ["ui.router"])
  .component("questura", QuesturaComponent)
  .service("QuesturaService", QuesturaService).name;

import { StructureOccupancyComponentController } from "./structure-occupancy.controller";

import "./structure-occupancy.scss";

export const StructureOccupancyComponent: ng.IComponentOptions = {
  controller: StructureOccupancyComponentController,
  templateUrl: require("./structure-occupancy.html")
};

import { CampCheckinoutComponentController } from "./camp-checkinout.controller";

import "./camp-checkinout.scss";

export const CampCheckinoutComponent = {
  bindings: {
    reservations: "<",
    title: "@"
  },
  controller: CampCheckinoutComponentController,
  templateUrl: require("./camp-checkinout.html")
};

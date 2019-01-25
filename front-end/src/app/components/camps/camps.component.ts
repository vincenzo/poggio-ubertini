import { CampsComponentController } from './camps.controller';

import './camps.scss';

export const CampsComponent: ng.IComponentOptions = {
  controller: CampsComponentController,
  templateUrl: require('./camps.html'),
}

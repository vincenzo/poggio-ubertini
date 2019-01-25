import { NavController } from './nav.controller';

import './nav.scss';

export const navComponent: ng.IComponentOptions = {
  bindings: {
    onLogout: '&'
  },
  templateUrl: require('./nav.html'),
  controller: NavController,
};


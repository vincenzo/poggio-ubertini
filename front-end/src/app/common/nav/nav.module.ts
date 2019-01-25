import * as angular from 'angular';

import { navComponent } from './nav.component';

export const NavModule = angular
  .module('common.nav', [ ])
  .component('appNav', navComponent)
  .name;

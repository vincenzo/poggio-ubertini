import * as angular from 'angular';

import { EwAngularjsUtilsModule } from './ew-angularjs-utils/ew-angularjs-utils.module';

export const VendorsModule = angular
  .module('vendors', [
    EwAngularjsUtilsModule,
  ])
  .name;
import * as angular from 'angular';

import { CampsFiltersComponent } from './camps-filters.component';

export const CampsFiltersModule = angular.module('camps.filters', [])
  .component('campsFilters', CampsFiltersComponent)
  .name;

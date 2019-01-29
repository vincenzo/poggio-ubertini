import * as angular from 'angular';

import { StructuresFiltersComponent } from './structures-filters.component';

export const StructuresFiltersModule = angular.module('structures.filters', [])
  .component('structuresFilters', StructuresFiltersComponent)
  .name;

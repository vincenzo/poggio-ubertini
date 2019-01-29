import * as angular from 'angular';

import { GuestsFiltersComponent } from './guests-filters.component';

export const GuestsFiltersModule = angular.module('guests.filters', [])
  .component('guestsFilters', GuestsFiltersComponent)
  .name;

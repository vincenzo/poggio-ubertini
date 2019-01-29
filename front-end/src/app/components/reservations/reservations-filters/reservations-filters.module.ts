import * as angular from 'angular';

import { ReservationsFiltersComponent } from './reservations-filters.component';

export const ReservationsFiltersModule = angular.module('reservations.filters', [])
  .component('reservationsFilters', ReservationsFiltersComponent)
  .name;

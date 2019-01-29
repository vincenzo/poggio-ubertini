import * as angular from 'angular';

import { RoomsFiltersComponent } from './rooms-filters.component';

export const RoomsFiltersModule = angular.module('rooms.filters', [])
  .component('roomsFilters', RoomsFiltersComponent)
  .name;

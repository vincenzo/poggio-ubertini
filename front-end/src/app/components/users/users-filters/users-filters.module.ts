import * as angular from 'angular';

import { UsersFiltersComponent } from './users-filters.component';

export const UsersFiltersModule = angular.module('users.filters', [])
  .component('usersFilters', UsersFiltersComponent)
  .name;

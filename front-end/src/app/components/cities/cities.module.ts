import * as angular from 'angular';

import { CitiesService } from './cities.service';

export const CitiesModule = angular.module('components.cities', [])
  .service('CitiesService', CitiesService)
  .name;

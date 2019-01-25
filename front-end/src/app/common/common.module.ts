/**
 * Common Module
 *
 * The Common module is the container reference for all application
 * specific components, that we don't want to use in another application.
 *
 * This can be things like layout, navigation and footers.
 *
 * See above how we import Common and inject them into the Root module,
 * this gives us a single place to import all common components for the app.
 */

import * as angular from 'angular';
import { AppModule } from './app/app.module';
import { NavModule } from './nav/nav.module';

export const CommonModule = angular
  .module('root.common', [
    AppModule,
    NavModule,
  ])
  .name;
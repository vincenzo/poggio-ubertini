/**
 * Components Module
 *
 * A Component module is the container reference for all reusable components.
 * See above how we import Components and inject them into the Root module,
 * this gives us a single place to import all components for the app.
 *
 * These modules we require are decoupled from all other modules and thus
 * can be moved into any other application with ease.
 *
 */

import * as angular from 'angular';

import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';

export const ComponentsModule = angular
  .module('root.components', [
    AuthModule,
    CitiesModule,
    DashboardModule,
    UsersModule,
  ])
  .name;
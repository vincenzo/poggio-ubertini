import { combineReducers } from 'redux';

import { AppReducer } from './common/app/app.reducer';
import { AuthReducer } from './components/auth/auth.reducer';
import { CampsReducer } from './components/camps/camps.reducer';
import { DashboardReducer } from './components/dashboard/dashboard.reducer';
import { LookupReducer } from './vendors/ew-angularjs-utils/components/lookup/lookup.reducer';
import { UploadsReducer } from './vendors/ew-angularjs-utils/components/uploads/uploads.reducer';
import { UsersReducer } from './components/users/users.reducer';

import { router } from 'redux-ui-router';

export const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  camps: CampsReducer,
  dashboard: DashboardReducer,
  lookup: LookupReducer,
  router,
  uploads: UploadsReducer,
  users: UsersReducer,
} as any);
// "as any" è un fix perché altrimenti typescript si arrabbia, controllare se
// si risolve aggiornando la lib redux

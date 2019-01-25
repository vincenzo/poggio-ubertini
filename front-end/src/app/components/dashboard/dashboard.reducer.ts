import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { DASHBOARD } from './dashboard.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = DASHBOARD;

const INITIAL_STATE = fromJS({
});

const customActions = {
};
const enables = ['all'];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const DashboardReducer = createReducer(INITIAL_STATE, reducer);

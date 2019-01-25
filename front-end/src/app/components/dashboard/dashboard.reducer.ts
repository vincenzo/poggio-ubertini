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
  cars: [],
  contracts: [],
  payments: [],
});

function getCarsDataFulfilled(state, action) {
  return state.set('cars', fromJS(action.payload.data));
}

function getContractsDataFulfilled(state, action) {
  return state.set('contracts', fromJS(action.payload.data));
}

function getNotesDataFulfilled(state, action) {
  return state.set('notes', fromJS(action.payload.data.value.notes));
}

function getPaymentsDataFulfilled(state, action) {
  return state.set('payments', fromJS(action.payload.data));
}

const customActions = {
  [constants.GET_CARS_DATA_FULFILLED]: getCarsDataFulfilled,
  [constants.GET_CONTRACTS_DATA_FULFILLED]: getContractsDataFulfilled,
  [constants.GET_NOTES_DATA_FULFILLED]: getNotesDataFulfilled,
  [constants.GET_PAYMENTS_DATA_FULFILLED]: getPaymentsDataFulfilled,
};
const enables = ['all'];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const DashboardReducer = createReducer(INITIAL_STATE, reducer);

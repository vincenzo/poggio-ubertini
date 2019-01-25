import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { APP } from './app.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = APP;

export const INITIAL_STATE = fromJS({
  error: null,
});

export function appError(state, action) {
  return state
    .set('error', fromJS(action.payload));
}

export function appResetError(state, action) {
  return state
    .set('error', null);
}

export function appSetActiveForm(state, action) {
  return state
    .set('activeForm', action.payload);
}

const customActions = {
  [constants.APP_ERROR]: appError,
  [constants.APP_RESET_ERROR]: appResetError,
  [constants.APP_SET_ACTIVE_FORM]: appSetActiveForm,
};
const enables = [];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const AppReducer = createReducer(INITIAL_STATE, reducer);

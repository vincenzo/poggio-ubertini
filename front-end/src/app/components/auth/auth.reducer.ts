import {
  createReducer,
  getReducer,
  stateError,
  updateObject,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { LOGIN } from './auth.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = LOGIN;

export const INITIAL_STATE = fromJS({
  token: null,
  user: null,
  hasError: false,
  isLoading: false,
});

export function loginUserFulfilled(state, action) {
  return state
    .set('token', action.payload.token)
    .set('user', action.payload.data.user)
    .set('hasError', false)
    .set('isLoading', false);
}

export function loginUserPending(state, action) {
  return state
    .set('token', null)
    .set('user', null)
    .set('hasError', false)
    .set('isLoading', true);
}

export function loginUserRejected(state, action) {
  return state
    .set('token', null)
    .set('user', null)
    .set('hasError', true)
    .set('isLoading', false);
}

export function logoutUser(state, action) {
  return state
    .set('token', null)
    .set('user', null)
    .set('hasError', false)
    .set('isLoading', false);
}

export function refreshTokenFulfilled(state, action) {
  return state
    .set('token', action.payload.token)
    .set('user', action.payload.data.user)
    .set('hasError', false)
    .set('isLoading', false);
}

export function updateUserSession(state, action) {
  return state.set('user', state.get('user').merge(action.payload));
}

const customActions = {
  [constants.LOGIN_USER_FULFILLED]: loginUserFulfilled,
  [constants.LOGIN_USER_PENDING]: loginUserPending,
  [constants.LOGIN_USER_REJECTED]: loginUserRejected,

  [constants.LOGOUT_USER]: logoutUser,

  [constants.REFRESH_TOKEN_FULFILLED]: refreshTokenFulfilled,

  [constants.UPDATE_USER_SESSION]: updateUserSession,
};
const enables = [];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const AuthReducer = createReducer(INITIAL_STATE, reducer);

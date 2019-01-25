import { generateConstants } from '../../vendors/ew-angularjs-utils/utils/generate-constants';

const domain = 'LOGIN';
const custom = {
  LOGIN_USER: `${domain}/LOGIN_USER`,
  LOGIN_USER_FULFILLED: `${domain}/LOGIN_USER_FULFILLED`,
  LOGIN_USER_PENDING: `${domain}/LOGIN_USER_PENDING`,
  LOGIN_USER_REJECTED: `${domain}/LOGIN_USER_REJECTED`,

  LOGOUT_USER: `${domain}/LOGOUT_USER`,

  REFRESH_TOKEN: `${domain}/REFRESH_TOKEN`,
  REFRESH_TOKEN_FULFILLED: `${domain}/REFRESH_TOKEN_FULFILLED`,
  REFRESH_TOKEN_PENDING: `${domain}/REFRESH_TOKEN_PENDING`,
  REFRESH_TOKEN_REJECTED: `${domain}/REFRESH_TOKEN_REJECTED`,

  UPDATE_USER_SESSION: `${domain}/UPDATE_USER_SESSION`,
};

const constants = custom;

export const LOGIN = constants;

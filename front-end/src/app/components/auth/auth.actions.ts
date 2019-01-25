import { LOGIN } from './auth.constants';

export const login = (tokenPromise) => ({
  type: LOGIN.LOGIN_USER,
  payload: tokenPromise
});

export const logout = () => ({
  type: LOGIN.LOGOUT_USER,
});

export const refreshToken = (refreshPromise) => ({
  type: LOGIN.REFRESH_TOKEN,
  payload: refreshPromise,
});

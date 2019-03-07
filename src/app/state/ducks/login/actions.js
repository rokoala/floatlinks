import {
  SET_LOGIN_ERROR,
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_AUTHENTICATION
} from './types';

export const setLoginPending = isLoginPending => ({
  type: SET_LOGIN_PENDING,
  payload: isLoginPending
});

export const setLoginSuccess = isLoginSuccess => ({
  type: SET_LOGIN_SUCCESS,
  payload: isLoginSuccess
});

export const setLoginError = loginError => ({
  type: SET_LOGIN_ERROR,
  payload: loginError
});

export const setAuthentication = authentication => ({
  type: SET_AUTHENTICATION,
  payload: authentication
});

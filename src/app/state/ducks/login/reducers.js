import { combineReducers } from 'redux';

import {
  SET_LOGIN_ERROR,
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_AUTHENTICATION
} from './types';

const initialLoginState = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null
};

const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return {
        ...state,
        isLoginPending: action.payload
      };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload
      };
    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: action.payload
      };
    default:
      return state;
  }
};

const authenticationReducer = (state = false, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return action.payload;
    default:
      return state;
  }
};

const reducers = combineReducers({
  loginStatus: loginReducer,
  authentication: authenticationReducer
});

export default reducers;

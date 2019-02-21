import { appActions } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case appActions.AUTHENTICATE:
      return {
        isAuthenticated: true,
      };
    case appActions.LOGOUT:
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

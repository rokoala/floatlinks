import { customerActions } from '../actions/actionTypes';

const initialState = {
  name: '',
};

export const customer = (state = initialState, action) => {
  switch (action.type) {
    case customerActions.SET_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
};

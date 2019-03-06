import { customerActions } from '../actions/actionTypes';

const initialState = {
  name: '',
  phone: '',
  serviceProviders: []
};

export const customer = (state = initialState, action) => {
  switch (action.type) {
    case customerActions.SET_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
};

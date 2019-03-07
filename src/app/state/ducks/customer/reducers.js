import { SET_CUSTOMER } from './types';

const initialState = {
  name: '',
  phone: null,
  serviceProviders: []
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER:
      return action.payload.customer;
    default:
      return state;
  }
};

const reducers = customerReducer;

export default reducers;

import { serviceProviderActions } from '../actions/actionTypes';

const initialState = {
  // example data
  // name: 'consultório dra. yasmin'
};

export const serviceProvider = (state = initialState, action) => {
  switch (action.type) {
    case serviceProviderActions.SET_SERVICE_PROVIDER:
      return action.serviceProvider;
    default:
      return state;
  }
};

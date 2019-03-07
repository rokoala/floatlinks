import { SET_SERVICE_PROVIDER } from './types';

const initialState = {};

const reducerServiceProvider = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICE_PROVIDER:
      return action.payload.serviceProvider;
    default:
      return state;
  }
};

const reducers = reducerServiceProvider;

export default reducers;

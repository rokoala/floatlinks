import * as types from './types';

export const set = serviceProvider => ({
  type: types.SET_SERVICE_PROVIDER,
  payload: {
    serviceProvider
  }
});

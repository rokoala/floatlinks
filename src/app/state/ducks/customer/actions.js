import * as types from './types';

export const set = customer => ({
  type: types.SET_CUSTOMER,
  payload: {
    customer
  }
});

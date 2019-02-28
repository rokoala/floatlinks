import * as types from './types';

export const setDays = days => ({
  type: types.SET_DAYS,
  payload: {
    days
  }
});

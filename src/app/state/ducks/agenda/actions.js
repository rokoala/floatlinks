import * as types from './types';

export const setDays = slots => ({
  type: types.SET_SLOTS,
  payload: {
    slots
  }
});

export const setHours = hours => ({
  type: types.SET_HOURS,
  payload: {
    hours
  }
});

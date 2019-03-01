import * as types from './types';

export const setDate = date => ({
  type: types.SET_DATE,
  payload: {
    date
  }
});

export const setHour = hour => ({
  type: types.SET_HOUR,
  payload: {
    hour
  }
});

import * as types from './types';

export const set = nextAppointments => ({
  type: types.SET_NEXT_APPOINTMENTS,
  payload: nextAppointments
});

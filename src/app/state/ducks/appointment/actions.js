import * as types from './types';

export const setAppointment = appointments => ({
  type: types.SET_APPOINTMENT,
  payload: {
    appointments
  }
});

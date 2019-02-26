import { upcomingAppointmentActions } from '../../actions/actionTypes';

const initialState = [];

export const upcomingAppointments = (state = initialState, action) => {
  switch (action.type) {
    case upcomingAppointmentActions.SET_UPCOMING_APPOINTMENT:
      return [...action.upcomingAppointments];
    default:
      return state;
  }
};

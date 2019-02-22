import { appointmentActions } from '../actions/actionTypes';

const initialState = {
  current: {},
  list: [],
  availableAgenda: {
    slots: []
  },
  availableHours: []
};

export const appointment = (state = initialState, action) => {
  switch (action.type) {
    case appointmentActions.SET_APPOINTMENTS:
      return {
        ...state,
        list: action.appointments
      };
    case appointmentActions.SET_DATE:
      return {
        ...state,
        current: {
          ...state.current,
          date: action.date
        }
      };
    case appointmentActions.SET_HOUR:
      return {
        ...state,
        current: {
          ...state.current,
          hour: action.hour
        }
      };
    case appointmentActions.SET_AVAILABLE_AGENDA:
      return {
        ...state,
        availableAgenda: action.availableAgenda
      };
    case appointmentActions.SET_AVAILABLE_HOURS:
      return {
        ...state,
        availableHours: action.availableHours
      };

    default:
      return state;
  }
};

import { appointmentActions } from '../actions/actionTypes';

const initialState = {
  current: {},
  list: [
    // EXAMPLE
    // { _id: 1, date: new Date(), time: null },
    // { _id: 2, date: new Date(), time: null }
  ],
};

export const appointment = (state = initialState, action) => {
  switch (action.type) {
    case appointmentActions.SET_APPOINTMENTS:
      return {
        ...state,
        list: action.list,
      };
    case appointmentActions.SET_DATE:
      return {
        ...state,
        current: {
          ...state.current,
          date: action.date,
        },
      };
    case appointmentActions.SET_HOUR:
      return {
        ...state,
        current: {
          ...state.current,
          hour: action.hour,
        },
      };

    default:
      return state;
  }
};

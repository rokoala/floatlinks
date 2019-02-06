import { scheduleActions } from '../actions/actionTypes';

const initialState = {
  current: {},
  list: [
    { _id: 1, date: new Date(), time: null },
    { _id: 2, date: new Date(), time: null }
  ]
};

export const schedule = (state = initialState, action) => {
  switch (action.type) {
    case scheduleActions.SET_DATE:
      return {
        ...state,
        current: {
          ...state.current,
          date: action.date
        }
      };
    case scheduleActions.SET_HOUR:
      return {
        ...state,
        current: {
          ...state.current,
          hour: action.hour
        }
      };

    default:
      return state;
  }
};

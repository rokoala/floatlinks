import { SET_NEXT_APPOINTMENTS } from './types';

const initialState = [];

const nextAppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEXT_APPOINTMENTS:
      return action.payload;
    default:
      return state;
  }
};

const reducers = nextAppointmentReducer;

export default reducers;

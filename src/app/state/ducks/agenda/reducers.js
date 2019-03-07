import { combineReducers } from 'redux';
import { SET_SLOTS, SET_HOURS } from './types';

/*
  days: [],
  hours: []
*/

const slotsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SLOTS:
      return action.payload.slots;
    default:
      return state;
  }
};

const hoursReducer = (state = [], action) => {
  switch (action.type) {
    case SET_HOURS:
      return action.payload.hours;
    default:
      return state;
  }
};

const reducer = combineReducers({
  slots: slotsReducer,
  hours: hoursReducer
});

export default reducer;

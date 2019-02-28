import { combineReducers } from 'redux';
import { SET_DAYS } from './types';

/*
  days: [],
  hours: []
*/

const daysReducer = (state = [], action) => {
  switch (action.type) {
    case SET_DAYS:
      return action.payload.days;
    default:
      return state;
  }
};

const reducer = combineReducers({
  days: daysReducer
});

export default reducer;

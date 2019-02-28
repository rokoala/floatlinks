import { combineReducers } from 'redux';
import { SET_APPOINTMENT } from './types';

/*
const initialState = {
  current: {},
  list: []
};

*/

const listReducer = (state = [], action) => {
  switch (action.type) {
    case SET_APPOINTMENT:
      return action.payload.appointments;
    default:
      return state;
  }
};

const reducer = combineReducers({
  list: listReducer
});

export default reducer;

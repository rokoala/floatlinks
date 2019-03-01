import { combineReducers } from 'redux';
import { SET_DATE, SET_HOUR } from './types';

/*
const initialState = {
  date: null,
  hour: null
};
*/

const dateReducer = (state = null, action) => {
  switch (action.type) {
    case SET_DATE:
      return action.payload.date;
    default:
      return state;
  }
};

const hourReducer = (state = null, action) => {
  switch (action.type) {
    case SET_HOUR:
      return action.payload.hour;
    default:
      return state;
  }
};

const reducer = combineReducers({
  date: dateReducer,
  hour: hourReducer
});

export default reducer;

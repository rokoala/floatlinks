import { confirmSchedulesActions } from '../actions/actionTypes';

const initialState = [
  {
    id: 1,
    label: '12 Fevereiro 14:00 -> 16:00',
    name: 'João',
    state: 0 // confirmed
  },
  {
    id: 2,
    label: '12 Fevereiro 16:00 -> 18:00',
    name: 'Maria',
    state: 1 // pending
  },
  {
    id: 3,
    label: '13 Fevereiro 16:00 -> 18:00',
    name: 'Jose',
    state: 2 // need confirmation
  }
];

export const confirmSchedules = (state = initialState, action) => {
  switch (action.type) {
    case confirmSchedulesActions.SET_SCHEDULES:
      return [...action.schedules];
    default:
      return state;
  }
};

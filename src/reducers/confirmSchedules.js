import { confirmSchedulesActions } from '../actions/actionTypes';

const initialState = [
  {
    id: 1,
    dayLabel: 'amanhã',
    initTimeLabel: '14:00',
    endTimeLabel: '16:00',
    name: 'João',
    status: 0 // confirmed
  },
  {
    id: 2,
    dayLabel: 'depois de amanhã',
    initTimeLabel: '16:00',
    endTimeLabel: '18:00',
    name: 'Maria',
    status: 1 // pending
  },
  {
    id: 3,
    dayLabel: '12/02/2019',
    initTimeLabel: '16:00',
    endTimeLabel: '18:00',
    name: 'Jose',
    status: 2 // need confirmation
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

import { customer } from './customer';
import { schedule } from './schedule';
import { confirmSchedules } from './confirmSchedules';
import { serviceProvider } from './serviceProvider';
import { app } from './app';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  app,
  customer,
  schedule,
  confirmSchedules,
  serviceProvider
});

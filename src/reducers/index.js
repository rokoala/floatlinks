import { customer } from './customer';
import { appointment } from './appointment';
import { confirmSchedules } from './confirmSchedules';
import { serviceProvider } from './serviceProvider';
import { app } from './app';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  app,
  customer,
  appointment,
  confirmSchedules,
  serviceProvider
});

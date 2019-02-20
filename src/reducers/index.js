import { customer } from './customer';
import { appointment } from './appointment';
import { confirmSchedules } from './confirmSchedules';
import { serviceProvider } from './serviceProvider';
import { app } from './app';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

export default history =>
  combineReducers({
    router: connectRouter(history),
    app,
    customer,
    appointment,
    confirmSchedules,
    serviceProvider,
  });

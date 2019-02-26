import { customer } from './customer';
import { appointment } from './appointment';
import { upcomingAppointments } from './admin/upcomingAppointments';
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
    upcomingAppointments,
    serviceProvider
  });

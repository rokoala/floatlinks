import {
  appActions,
  customerActions,
  confirmSchedulesActions,
  appointmentActions
} from './actionTypes';
import Api from '../resources/Api';

export const setCustomer = customer => ({
  type: customerActions.SET_CUSTOMER,
  customer
});

export const authenticate = () => ({
  type: appActions.AUTHENTICATE
});

export const logout = () => ({
  type: appActions.LOGOUT
});

export const setDate = date => ({
  type: appointmentActions.SET_DATE,
  date
});

export const setHour = hour => ({
  type: appointmentActions.SET_HOUR,
  hour
});

export const updateCustomer = (phone, customer) => dispatch => {
  Api.Customer.update(phone, customer)
    .then(response => {
      dispatch(setCustomer(response.data));
    })
    .catch(err => console.error(err));
};

export const removeSchedule = () => dispatch => {
  // Call Api... on success...
  console.log('Implement remove schedule...');
};

export const setConfirmSchedules = schedules => ({
  type: confirmSchedulesActions.SET_SCHEDULES,
  schedules
});

export const setAppointments = appointments => ({
  type: appointmentActions.SET_APPOINTMENTS,
  appointments
});

// APPOINTMENTS
// Get a list of all appointments
export const getAppointments = customerId => dispatch => {
  Api.Appointments.getAll(customerId)
    .then(response => {
      dispatch(setAppointments(response.data));
    })
    .catch(err =>
      console.error(`Error fetching data from appointments: ${err}`)
    );
};

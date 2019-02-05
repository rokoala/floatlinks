import {
  appActions,
  customerActions,
  confirmSchedulesActions,
  scheduleActions
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
  type: scheduleActions.SET_DATE,
  date
});

export const setHour = hour => ({
  type: scheduleActions.SET_HOUR,
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
import {
  appActions,
  customerActions,
  confirmSchedulesActions,
  appointmentActions,
  serviceProviderActions,
} from './actionTypes';
import Api from '../resources/Api';
import { push } from 'connected-react-router';

export const setCustomer = customer => ({
  type: customerActions.SET_CUSTOMER,
  customer,
});

export const authenticate = () => ({
  type: appActions.AUTHENTICATE,
});

export const logout = () => ({
  type: appActions.LOGOUT,
});

export const setDate = date => ({
  type: appointmentActions.SET_DATE,
  date,
});

export const setAppointmentHour = hour => ({
  type: appointmentActions.SET_HOUR,
  hour,
});

export const updateCustomer = (phone, customer) => dispatch => {
  Api.Customer.update(phone, customer)
    .then(response => {
      dispatch(setCustomer(response.data));
    })
    .catch(err => console.error(err));
};

export const setConfirmSchedules = schedules => ({
  type: confirmSchedulesActions.SET_SCHEDULES,
  schedules,
});

export const setAppointments = appointments => ({
  type: appointmentActions.SET_APPOINTMENTS,
  appointments,
});

// APPOINTMENTS
// Get a list of all appointments
export const getAppointments = (customerId, serviceProviderId) => dispatch => {
  Api.Appointments.getAll(customerId, serviceProviderId)
    .then(response => {
      dispatch(setAppointments(response.data.appointments));
    })
    .catch(err =>
      console.error(`Error fetching data from appointments: ${err}`),
    );
};

export const setAppointmentAvailableHours = availableHours => ({
  type: appointmentActions.SET_AVAILABLE_HOURS,
  availableHours,
});

export const getHoursByDate = (serviceProviderId, date) => dispatch => {
  Api.Appointments.getHoursByDate(serviceProviderId, date)
    .then(response =>
      dispatch(setAppointmentAvailableHours(response.data.agenda.slots)),
    )
    .catch(err =>
      console.error(
        `Error fetching data trying to get hours from serviceprovider:${err}`,
      ),
    );
};

export const confirmAppointment = (...args) => dispatch =>
  Api.Appointments.add(...args)
    .then(response => {
      dispatch(push('/'));
    }) // Create success dispatch to notification
    .catch(err => console.error(`Error inserting new appointment:${err}`));

export const removeAppointment = (
  customerId,
  serviceProviderId,
  slotId,
) => dispatch => {
  Api.Appointments.remove(customerId, serviceProviderId, slotId)
    .then(response => {
      console.log(response);
      // NEED TO GET NEW DATA OF DELETE
      dispatch(push('/'));
    })
    .catch(err => console.error(`Error removing appointment:${err}`));
};

// SERVICE PROVIDER
export const setServiceProvider = serviceProvider => ({
  type: serviceProviderActions.SET_SERVICE_PROVIDER,
  serviceProvider,
});

export const getServiceProvider = phoneId => dispatch => {
  Api.ServiceProvider.get(phoneId)
    .then(response => dispatch(setServiceProvider(response.data)))
    .catch(err =>
      console.error(`Error fetching data from servicerProvider: ${err}`),
    );
};

export const setAppointmentAvailableAgenda = availableAgenda => ({
  type: appointmentActions.SET_AVAILABLE_AGENDA,
  availableAgenda,
});

export const getAgendaByServiceProviderId = serviceProviderId => dispatch => {
  Api.Appointments.getAgenda(serviceProviderId, new Date()) //FIXED GET AGENDA FROM TODAY
    .then(response =>
      dispatch(setAppointmentAvailableAgenda(response.data.agenda)),
    )
    .catch(err =>
      console.error(
        `Error fetching data trying to get agenda from serviceprovider:${err}`,
      ),
    );
};

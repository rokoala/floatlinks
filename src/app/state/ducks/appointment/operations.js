import { setAppointment } from './actions';
import axios from 'axios';
import moment from 'moment';

const API_URL = process.env.REACT_APP_API_URL;

// Get a list of all appointments
const getAppointments = (customerId, serviceProviderId) => dispatch => {
  axios
    .get(
      `${API_URL}/appointment/customer/${customerId}/${serviceProviderId}/${moment().format(
        'YYYY-MM-DD'
      )}`
    )
    .then(response => {
      dispatch(setAppointment(response.data.appointments));
    })
    .catch(err =>
      console.error(`Error fetching data from appointments: ${err}`)
    );
};

export { getAppointments };

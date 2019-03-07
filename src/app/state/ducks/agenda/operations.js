import { setDays, setHours } from './actions';
import axios from 'axios';
import moment from 'moment';

const API_URL = process.env.REACT_APP_API_URL;

const get = (serviceProviderId, startDate) => dispatch => {
  axios
    .get(
      `${API_URL}/appointment/serviceprovider/${serviceProviderId}/agenda/${moment(
        startDate
      ).format('YYYY-MM-DD')}`
    )
    .then(response => {
      dispatch(setDays(response.data.agenda.slots));
    })
    .catch(err =>
      console.error(
        `Error fetching data trying to get agenda from serviceprovider:${err}`
      )
    );
};

const getHoursByDate = (serviceProviderId, startDate) => dispatch => {
  const dayStart = moment(startDate).format('YYYY-MM-DD');
  const dayEnd = moment(startDate)
    .add(1, 'days')
    .format('YYYY-MM-DD');

  axios
    .get(
      `${API_URL}/appointment/serviceprovider/${serviceProviderId}/agenda/${dayStart}/${dayEnd}`
    )
    .then(response => {
      dispatch(setHours(response.data.agenda.slots));
    })
    .catch(err =>
      console.error(
        `Error fetching data trying to get agenda from serviceprovider:${err}`
      )
    );
};

export { get, getHoursByDate };

import { setDays } from './actions';
import axios from 'axios';
import moment from 'moment';

const API_URL = process.env.REACT_APP_API_URL;

const getAgendaByServiceProviderId = (
  serviceProviderId,
  startDate
) => dispatch => {
  axios
    .get(
      `${API_URL}/appointment/serviceprovider/${serviceProviderId}/agenda/${moment(
        startDate
      ).format('YYYY-MM-DD')}`
    )
    .getAgenda(serviceProviderId, new Date()) //FIXED GET AGENDA FROM TODAY
    .then(response => dispatch(setDays(response.data.agenda)))
    .catch(err =>
      console.error(
        `Error fetching data trying to get agenda from serviceprovider:${err}`
      )
    );
};

export { getAgendaByServiceProviderId };

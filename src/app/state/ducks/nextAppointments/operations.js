import axios from 'axios';
import { set } from './actions';
import moment from 'moment';

const API_URL = process.env.REACT_APP_API_URL;

const get = (serviceProviderId, startDate) => dispatch =>
  axios
    .get(
      `${API_URL}/appointment/serviceprovider/${serviceProviderId}/confirmation/${moment(
        startDate
      ).format('YYYY-MM-DD')}/`
    )
    .then(response => {
      dispatch(set(response.data.agenda.slots));
    })
    .catch(err => console.error(err));

export { get, set };

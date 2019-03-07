import { setDate, setHour } from './actions';
import { push } from 'connected-react-router';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const confirm = (slotId, customerId, serviceProviderId) => dispatch => {
  axios
    .post(`${API_URL}/appointment/`, {
      slotId,
      customerId,
      serviceProviderId
    })
    .then(response => {
      dispatch(push('/'));
    })
    .catch(err => console.error(`Error inserting new appointment:${err}`));
};

export { setDate, setHour, confirm };

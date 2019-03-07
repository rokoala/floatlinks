import { setAuthentication } from './actions';
import { customerOperations } from '../customer';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const login = phone => dispatch => {
  return axios
    .post(`${API_URL}/login`, {
      phone
    })
    .then(response => {
      dispatch(setAuthentication(true));
      dispatch(customerOperations.setCustomer(response.data.customer));
      return response;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
};

export default { login };

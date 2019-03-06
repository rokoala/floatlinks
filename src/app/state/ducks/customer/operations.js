import { set as setCustomer } from './actions';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Add new customer
 *
 * @todo Limitar requisição somente pelo provedor de serviço autorizado
 *
 * @param {string} name
 * @param {number} phone
 */
const addCustomer = (name, phone) => dispatch => {
  return axios.post(`${API_URL}/customer`, {
    name,
    phone
  });
};

const updateCustomer = (phone, customer) => dispatch => {
  axios
    .put(`${API_URL}/customer/` + phone, {
      ...customer
    })
    .then(response => {
      dispatch(setCustomer(response.data));
    })
    .catch(err => console.error(err));
};

export { setCustomer, updateCustomer };

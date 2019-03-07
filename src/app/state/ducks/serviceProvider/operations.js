import { set as setServiceProvider } from './actions';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const get = () => dispatch =>
  axios
    .get(`${API_URL}/serviceprovider/`)
    .then(response => dispatch(setServiceProvider(response.data[0])))
    .catch(err => console.error(err));

export { setServiceProvider, get };

import axios from 'axios';
import moment from 'moment';

const API_URL = process.env.REACT_APP_API_URL;

const Api = {
  login(phone, cb) {
    return axios
      .post(`${API_URL}/login`, {
        phone,
      })
      .then(response => {
        this.isAuthenticated = true;
        cb(response.data);
      });
  },
  Appointments: {
    getAll: customerId =>
      axios.get(`${API_URL}/appointment/customer/${customerId}`),
    getHoursFromDate: date =>
      axios.get(`${API_URL}/appointment/customer/date/`, {
        date,
      }),
    getAgenda: (serviceProviderId, startDate) =>
      axios.get(
        `${API_URL}/appointment/serviceprovider/${serviceProviderId}/agenda/${moment(
          startDate,
        ).format('YYYY-MM-DD')}`,
      ),
  },
  ServiceProvider: {
    get: phone => axios.get(`${API_URL}/serviceprovider/${phone}`),
  },
  Customer: {
    add: body =>
      axios.post(`${API_URL}/customer`, {
        ...body,
      }),
    get: () =>
      axios
        .get(`${API_URL}/customer`)
        .then(data => console.log(data))
        .catch(err => console.error(err)),
    update: (phone, customer) =>
      axios.put(`${API_URL}/customer/` + phone, {
        ...customer,
      }),
  },
};

export default Api;

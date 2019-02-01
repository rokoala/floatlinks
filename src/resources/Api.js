import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Api = {
  login(phone, cb) {
    return axios
      .post(`${API_URL}/login`, {
        phone
      })
      .then(response => {
        this.isAuthenticated = true;
        cb(response.data);
      });
  },
  Customer: {
    add: body =>
      axios
        .post(`${API_URL}/customer`, {
          ...body
        })
        .then(response => console.log(response))
        .catch(err => console.error(err)),
    get: () =>
      axios
        .get(`${API_URL}/customer`)
        .then(data => console.log(data))
        .catch(err => console.error(err)),
    update: (phone, customer) =>
      axios.put(`${API_URL}/customer/` + phone, {
        ...customer
      })
  }
};

export default Api;

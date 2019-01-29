import Api from '../resources/Api';

const user = {
  isAuthenticated: false,
  authenticate(phone, cb) {
    Api.login({ phone }).then(response => {
      this.isAuthenticated = true;
      cb(response.data);
    });
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default user;

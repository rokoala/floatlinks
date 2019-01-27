const user = {
  isAuthenticated: false,
  authenticate(phone, cb) {
    // check phone...
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default user;

const mongoose = require('mongoose');
const {
  server,
  database,
  user,
  password,
} = require('../config/database.config.json');

const connectionURI =
  process.env.MONGODB_URI ||
  `mongodb://${user}:${password}@${server}/${database}`;

mongoose.connect(connectionURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

module.exports = mongoose;

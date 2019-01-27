const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'floatlinks';
const user = 'floatlinks';
const password = 'floatlinks';

mongoose.connect(
  `mongodb://${user}:${password}@${server}/${database}`,
  { useCreateIndex: true, useNewUrlParser: true }
);

const CustomerSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Customer', CustomerSchema);

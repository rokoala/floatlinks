const mongoose = require('../conn');

module.exports = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: String,
    phone: {
      type: Number,
      required: true,
      unique: true
    }
  })
);

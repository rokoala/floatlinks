const mongoose = require('../conn');

module.exports = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: String,
    phone: {
      type: Number,
      unique: true,
      required: true
    },
    serviceProviders: [{
      providerId: mongoose.Schema.Types.ObjectId,
      name: String,
      providerPhone: {
        type: Number,
        required: true
      },
      appointments: [{
        appointmentSlotId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
        appointmentDate: {
          type: Date,
          required: true
        },
        startTime: {
            type: Number,
            min: 0,
            max: 2359,
            required: true
        },
        appointmentDuration: {
            type: Number,
            min: 5,
            max: 6000,
            required: true
        },
        annotation: String
      }]
    }]
  })
);

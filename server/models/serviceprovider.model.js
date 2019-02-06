const mongoose = require('../conn');

module.exports = mongoose.model(
  'ServiceProvider',
  new mongoose.Schema({
    name: String,
    phone: {
      type: Number,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true
    },
    defaultAppointmentDuration: {
        type: Number,
        required: true,
    },
    agenda: {
        slots: [{
            slotDate: {
                type: Date,
                required: true
            },
            startTime: {
                type: Number,
                min: 0,
                max: 2359,
                required: true
            },
            slotDuration: {
                type: Number,
                min: 5,
                max: 6000,
                required: true
            },
            isOccupied: {
                type: Boolean,
                required: true
            },
            customer: {
                customerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Customer'
                },
                name: String,
                phone: {
                    type: Number,
                }
            },
            annotation: String
        }],
        isOpen: {
            type: Boolean
        }
    },
    customers: [{
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        name: String,
        phone: {
            type: Number
        }
    }]
  })
);
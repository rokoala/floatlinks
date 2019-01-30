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
                max: 2359
            },
            slotDuration: {
                type: Number,
                min: 5,
                max: 6000
            },
            isOccupied: {
                type: Boolean,
                required: true
            },
            customer: {
                customerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    unique: true,
                    ref: 'Customer'
                },
                name: String,
                phone: {
                    type: Number,
                    required=true,
                    unique=true
                }
            },
            annotation: String
        }],
        isOpen: {
            type: Boolean,
            required: true
        }
    },
    customers: [{
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'Customer'
        },
        name: String,
        phone: {
            type: Number,
            required=true,
            unique=true
        }
    }]
  })
);
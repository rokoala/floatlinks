const CustomerModel = require('../models/customer.model');
const ServiceProviderModel = require('../models/serviceprovider.model');
const express = require('express');
const router = express.Router();
const { validate, promiseResultHandler } = require('../utils/RouteMiddleware');
const Fawn = require('fawn');
const mongoose = require('../conn');
ObjectId = require('mongodb').ObjectID;

Fawn.init(mongoose);

//Create a new appointment
router.post('/',  (req, res) => {
  validate(req.body, res, 'Request body is missing.');
  customerId = ObjectId(req.body.customerId)
  serviceProviderId = ObjectId(req.body.serviceProviderId)
  slotId = ObjectId(req.body.slotId)
  promiseResultHandler(res)(
    new Fawn.Task()
      .update('customers', { _id: customerId }, {
        $push: {
          serviceProviders: {
            providerId: serviceProviderId,
            name: 'Teste',
            providerPhone: 123456,
            appointments: {
              appointmentSlotId: slotId,
              appointmentDate: '2019-01-01',
              startTime: 1000,
              appointmentDuration: 60,
              annotation: 'teste'
            }
          }
        }
      })
      .update('serviceproviders', { _id: serviceProviderId , 'agenda.slots.slotId': slotId}, {
        $set: {
          'agenda.slots.0.isOccupied': true
        }/* ,
        $push: {
          'agenda.slots.customer': {
            customerId: customerId,
            name: 'Cliente 1',
            phone: 123465
          }
        } */
      })
      .run()
    );
    
});

router.get('/', (req, res) => {
  // res.send('test');
  promiseResultHandler(res)(CustomerModel.find({}));
});

router.get('/:customerId', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.find({ phone: req.params.customerPhone }).select('serviceProviders')
  );
});

router.get('/:customerId/:serviceProviderId', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.find({ _id: req.params.customerPhone, 'serviceProviders.providerId': req.params.serviceProviderId }, {'serviceProviders.$':1})
  );
});

router.put('/:phone', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.findOneAndUpdate(
      {
        phone: req.params.phone
      },
      req.body,
      {
        new: true
      }
    )
  );
});

module.exports = router;

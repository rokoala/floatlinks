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
  slotId = ObjectId(req.body.slotId)
  customer = CustomerModel.aggregate([
    { $match: {_id: ObjectId(req.body.customerId)}},
    { $unwind: '$serviceProviders'},
    { $match: {'serviceProviders.providerId': ObjectId(req.body.serviceProviderId)}}]).exec()

  serviceProvider = ServiceProviderModel.aggregate([
    { $match: {_id: ObjectId(req.body.serviceProviderId)}},
    { $unwind: "$agenda.slots"},
    { $match: {'agenda.slots._id': slotId}},
    { $project: { password: 0 }}
    ]).exec()
    
  let appointmentCreation = null
  let slotReservation = null

  Promise.all([customer, serviceProvider])
    .then(  (results,slotId) => {
      customer = results[0][0]
      serviceProvider = results[1][0]
      console.log(serviceProvider.agenda.slots)
      if(!customer && serviceProvider && !serviceProvider.agenda.slots.isOccupied){
        appointmentCreation = CustomerModel.findByIdAndUpdate(req.body.customerId, {
          $push: {
            serviceProviders: {
              providerId: serviceProvider._id,
              name: serviceProvider.name,
              providerPhone: serviceProvider.phone,
              appointments: [{
                appointmentSlotId: serviceProvider.agenda.slots._id,
                appointmentDate: serviceProvider.agenda.slots.slotDate,
                startTime: serviceProvider.agenda.slots.startTime,
                appointmentDuration: serviceProvider.agenda.slots.slotDuration,
                annotation: serviceProvider.agenda.slots.annotation
              }]
            }
          }
        }).exec()

        
      }
      else if(customer && serviceProvider && !serviceProvider.agenda.slots.isOccupied) {
        appointmentCreation = CustomerModel.findOneAndUpdate({
              _id: req.body.customerId 
          },
          {
            $addToSet: {
              'serviceProviders.$[outer].appointments': {
                appointmentSlotId: serviceProvider.agenda.slots._id,
                appointmentDate: serviceProvider.agenda.slots.slotDate,
                startTime: serviceProvider.agenda.slots.startTime,
                appointmentDuration: serviceProvider.agenda.slots.slotDuration,
                annotation: serviceProvider.agenda.slots.annotation
              }
            }
          },
          {
            "arrayFilters": [{ "outer.providerId": serviceProvider._id }] 
          }).exec()
      }
      if(appointmentCreation){
        slotReservation = ServiceProviderModel.findOneAndUpdate({
          _id: req.body.serviceProviderId 
          }, {
          $set: {
            'agenda.slots.$[outer].isOccupied': true
          },
          $push: {
            'agenda.slots.$[outer].customer': {
              customerId: customer._id,
              name: customer.name,
              phone: customer.phone
            }
          }
        },
        {
          "arrayFilters": [{ "outer._id": serviceProvider.agenda.slots._id }]
          
        }
        ).exec()
      }
       
      promiseResultHandler(res)(
        slotReservation
      )
     
    
    }
  )
});


router.get('/customer/:customerId', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.find({ _id: req.params.customerId }).select('serviceProviders')
  );
});

router.get('/customer/:customerId/:serviceProviderId', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.find({ _id: req.params.customerId, 'serviceProviders.providerId': req.params.serviceProviderId }, {'serviceProviders.$':1})
  );
});

router.delete('/customer/:customerId/:serviceProviderId/:slotId', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.findOneAndUpdate(
      {
        _id: req.params.customerId
      },
      {
        $pop: 'serviceProviders.$[outer].appointments.$[inner]'
      },
      {
        "arrayFilters": [
          { "outer.providerId": req.params.serviceProviderId },
          { "inner.appointmentSlotId": req.params.slotId }
      ]
        
      }
    )
  );
});

module.exports = router;

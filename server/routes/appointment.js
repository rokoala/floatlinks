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
  customer = CustomerModel.aggregate([
    { $match: {_id: ObjectId(req.body.customerId)}},
    { $unwind: '$serviceProviders'},
    { $match: {'serviceProviders.providerId': ObjectId(req.body.serviceProviderId)}}]).exec()
  serviceProvider = ServiceProviderModel.findById(req.body.serviceProviderId).exec()
  slotId = ObjectId(req.body.slotId)
  Promise.all([customer, serviceProvider])
    .then(  (results,slotId) => {
      customer = results[0][0]
      serviceProvider = results[1]
      if(!customer){
        serviceProviderCreation = CustomerModel.findByIdAndUpdate(req.body.customerId, {
          $push: {
            serviceProviders: {
              providerId: serviceProvider._id,
              name: serviceProvider.name,
              providerPhone: serviceProvider.phone,
            }
          }
        }).exec()
      }
      
      appointmentCreation = CustomerModel.findOneAndUpdate({
         _id: req.body.customerId 
      },
      {
        $addToSet: {
          'serviceProviders.$[outer].appointments': {
            appointmentSlotId: slotId,
            appointmentDate: '2001-08-05',
            startTime: 1700,
            appointmentDuration: 100,
            annotation: 'teste'
          }
        }
      },
      {
        "arrayFilters": [{ "outer.providerId": serviceProvider._id }] 
      }).exec() 
      promiseResultHandler(res)(
        appointmentCreation
      )
     
    
      //console.log(results[0])
    }
  )
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

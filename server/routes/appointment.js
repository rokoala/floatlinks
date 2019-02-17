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
router.post('/', (req, res) => {
  validate(req.body, res, 'Request body is missing.');
  const slotId = ObjectId(req.body.slotId);
  let customer = CustomerModel.aggregate([
    { $match: { _id: ObjectId(req.body.customerId) } },
    { $unwind: '$serviceProviders' },
    {
      $match: {
        'serviceProviders.providerId': ObjectId(req.body.serviceProviderId),
      },
    },
  ]).exec();

  let customerFullInfo = CustomerModel.findById(
    req.body.customerId,
    '_id name phone',
  ).exec();

  let serviceProvider = ServiceProviderModel.aggregate([
    { $match: { _id: ObjectId(req.body.serviceProviderId) } },
    { $unwind: '$agenda.slots' },
    { $match: { 'agenda.slots._id': slotId } },
    { $project: { password: 0 } },
  ]).exec();

  let appointmentCreation = null;
  let slotReservation = null;

  Promise.all([customer, serviceProvider, customerFullInfo]).then(
    (results, slotId) => {
      customer = results[0][0];
      serviceProvider = results[1][0];
      customerFullInfo = results[2];
      if (
        !customer &&
        serviceProvider &&
        !serviceProvider.agenda.slots.isOccupied
      ) {
        appointmentCreation = CustomerModel.findByIdAndUpdate(
          req.body.customerId,
          {
            $push: {
              serviceProviders: {
                providerId: serviceProvider._id,
                name: serviceProvider.name,
                providerPhone: serviceProvider.phone,
                appointments: [
                  {
                    appointmentSlotId: serviceProvider.agenda.slots._id,
                    appointmentDate: serviceProvider.agenda.slots.slotDate,
                    startTime: serviceProvider.agenda.slots.startTime,
                    appointmentDuration:
                      serviceProvider.agenda.slots.slotDuration,
                    annotation: serviceProvider.agenda.slots.annotation,
                  },
                ],
              },
            },
          },
        ).exec();
      } else if (
        customer &&
        serviceProvider &&
        !serviceProvider.agenda.slots.isOccupied
      ) {
        appointmentCreation = CustomerModel.findOneAndUpdate(
          {
            _id: req.body.customerId,
          },
          {
            $addToSet: {
              'serviceProviders.$[outer].appointments': {
                appointmentSlotId: serviceProvider.agenda.slots._id,
                appointmentDate: serviceProvider.agenda.slots.slotDate,
                startTime: serviceProvider.agenda.slots.startTime,
                appointmentDuration: serviceProvider.agenda.slots.slotDuration,
                annotation: serviceProvider.agenda.slots.annotation,
              },
            },
          },
          {
            arrayFilters: [{ 'outer.providerId': serviceProvider._id }],
          },
        ).exec();
      } else {
        res.status(200).send('Slot already in use.');
      }
      if (appointmentCreation) {
        const newCustomer = {
          customerId: customerFullInfo._id,
          name: customerFullInfo.name,
          phone: customerFullInfo.phone,
        };
        slotReservation = ServiceProviderModel.findOneAndUpdate(
          {
            _id: req.body.serviceProviderId,
          },
          {
            $set: {
              'agenda.slots.$[outer].isOccupied': true,
              'agenda.slots.$[outer].customer': newCustomer,
            },
            $addToSet: {
              customers: newCustomer,
            },
          },
          {
            arrayFilters: [{ 'outer._id': serviceProvider.agenda.slots._id }],
          },
        ).exec();
        promiseResultHandler(res)(slotReservation);
      }
    },
  );
});

router.post('/serviceprovider/slot/', (req, res) => {
  promiseResultHandler(res)(
    ServiceProviderModel.findOneAndUpdate(
      { _id: req.body.serviceProviderId },
      {
        $addToSet: {
          'agenda.slots': req.body.newSlot,
        },
      },
    ).exec(),
  );
});

router.delete(
  '/serviceprovider/slot/:serviceProviderId/:slotId',
  (req, res) => {
    promiseResultHandler(res)(
      ServiceProviderModel.findOneAndUpdate(
        { _id: req.params.serviceProviderId },
        {
          $pull: {
            'agenda.slots': {
              _id: req.params.slotId,
            },
          },
        },
      ).exec(),
    );
  },
);

router.get('/serviceprovider/:serviceProviderId/agenda/:startDate', (req, res) => {
  let serviceProvider = ServiceProviderModel.aggregate([
    { $match: {_id: ObjectId(req.params.serviceProviderId)}},
    { 
      $project: {
        'agenda.slots': {
          $filter: {
            input: "$agenda.slots", 
            as: "slots", 
            cond: { 
              $and: [
                {$gte: ["$$slots.slotDate", new Date(req.params.startDate)]},
                {$eq: ["$$slots.isOccupied", false]}
              ]  
            }
          }
        }
      }
    }]).exec()
  promiseResultHandler(res)(
    serviceProvider
  );
});


router.get('/customer/:customerId', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.find({ _id: req.params.customerId }).select(
      'serviceProviders',
    ),
  );
});

router.get('/customer/:customerId/:serviceProviderId', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.find(
      {
        _id: req.params.customerId,
        'serviceProviders.providerId': req.params.serviceProviderId,
      },
      { 'serviceProviders.$': 1 },
    ),
  );
});

router.get(
  '/customer/:customerId/:serviceProviderId/:startDate/:endDate',
  (req, res) => {
    let serviceProvider = CustomerModel.aggregate([
      { $match: { _id: ObjectId(req.params.customerId) } },
      {
        $project: {
          serviceProviders: {
            $map: {
              input: {
                $filter: {
                  input: '$serviceProviders',
                  as: 'sp',
                  cond: {
                    $eq: [
                      '$$sp.providerId',
                      ObjectId(req.params.serviceProviderId),
                    ],
                  },
                },
              },
              as: 'sp',
              in: {
                providerId: '$$sp.providerId',
                appointments: {
                  $filter: {
                    input: '$$sp.appointments',
                    as: 'app',
                    cond: {
                      $and: [
                        {
                          $lte: [
                            '$$app.appointmentDate',
                            new Date(req.params.endDate),
                          ],
                        },
                        {
                          $gte: [
                            '$$app.appointmentDate',
                            new Date(req.params.startDate),
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]).exec();
    promiseResultHandler(res)(serviceProvider);
  },
);

router.delete(
  '/customer/:customerId/:serviceProviderId/:slotId',
  (req, res) => {
    let appointmentDeletion = CustomerModel.findOneAndUpdate(
      {
        _id: req.params.customerId,
        'serviceProviders.providerId': req.params.serviceProviderId,
      },
      {
        $pull: {
          'serviceProviders.$.appointments': {
            slotId: req.params.slotId,
          },
        },
      },
      {
        multi: true,
      },
    ).exec();
    let slotFreeing = ServiceProviderModel.findOneAndUpdate(
      {
        _id: req.params.serviceProviderId,
      },
      {
        $set: {
          'agenda.slots.$[outer].isOccupied': false,
        },
        $unset: {
          'agenda.slots.$[outer].customer': null,
        },
      },
      {
        arrayFilters: [{ 'outer._id': req.params.slotId }],
      },
    ).exec();
    promiseResultHandler(res)(Promise.all([appointmentDeletion, slotFreeing]));
  },
);

module.exports = router;

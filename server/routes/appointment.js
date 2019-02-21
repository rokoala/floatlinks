const CustomerModel = require('../models/customer.model');
const ServiceProviderModel = require('../models/serviceprovider.model');
const express = require('express');
const router = express.Router();
const { validate, promiseResultHandler } = require('../utils/RouteMiddleware');
const Fawn = require('fawn');
const mongoose = require('../conn');
ObjectId = require('mongodb').ObjectID;

Fawn.init(mongoose);

//Creates a new appointment
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
                phone: serviceProvider.phone,
                appointments: [
                  {
                    slotId: serviceProvider.agenda.slots._id,
                    date: serviceProvider.agenda.slots.date,
                    startTime: serviceProvider.agenda.slots.startTime,
                    slotDuration: serviceProvider.agenda.slots.slotDuration,
                    annotation: serviceProvider.agenda.slots.annotation,
                  },
                ],
              },
            },
          },
          {
            new: true,
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
                slotId: serviceProvider.agenda.slots._id,
                date: serviceProvider.agenda.slots.date,
                startTime: serviceProvider.agenda.slots.startTime,
                slotDuration: serviceProvider.agenda.slots.slotDuration,
                annotation: serviceProvider.agenda.slots.annotation,
              },
            },
          },
          {
            arrayFilters: [{ 'outer.providerId': serviceProvider._id }],
            new: true,
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
            new: true,
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
      {
        new: true,
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
        {
          new: true,
        },
      ).exec(),
    );
  },
);

router.get(
  '/serviceprovider/:serviceProviderId/agenda/:startDate/:endDate?',
  (req, res) => {
    let serviceProvider = null;
    if (!req.params.endDate) {
      serviceProvider = ServiceProviderModel.aggregate([
        { $match: { _id: ObjectId(req.params.serviceProviderId) } },
        {
          $project: {
            'agenda.slots': {
              $filter: {
                input: '$agenda.slots',
                as: 'slots',
                cond: {
                  $and: [
                    { $gte: ['$$slots.date', new Date(req.params.startDate)] },
                    { $eq: ['$$slots.isOccupied', false] },
                  ],
                },
              },
            },
          },
        },
      ])
        .exec()
        .then(items => items[0]);
    } else {
      serviceProvider = ServiceProviderModel.aggregate([
        { $match: { _id: ObjectId(req.params.serviceProviderId) } },
        {
          $project: {
            'agenda.slots': {
              $filter: {
                input: '$agenda.slots',
                as: 'slots',
                cond: {
                  $and: [
                    { $gte: ['$$slots.date', new Date(req.params.startDate)] },
                    { $lte: ['$$slots.date', new Date(req.params.endDate)] },
                    { $eq: ['$$slots.isOccupied', false] },
                  ],
                },
              },
            },
          },
        },
      ])
        .exec()
        .then(items => items[0]);
    }

    promiseResultHandler(res)(serviceProvider);
  },
);

router.get('/customer/:customerId', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.find({ _id: req.params.customerId }).select(
      'serviceProviders',
    ),
  );
});

//lists all appointments in customer collection for a particular service provider
router.get(
  '/customer/:customerId/:serviceProviderId/:startDate/:endDate?',
  (req, res) => {
    let queryReturn = null;
    if (!req.params.endDate) {
      queryReturn = CustomerModel.aggregate([
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
                            $gte: [
                              '$$app.date',
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
      ])
        .exec()
        .then(items => items[0].serviceProviders[0]);
    } else {
      queryReturn = CustomerModel.aggregate([
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
                            $gte: [
                              '$$app.date',
                              new Date(req.params.startDate),
                            ],
                          },
                          {
                            $lte: ['$$app.date', new Date(req.params.endDate)],
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
      ])
        .exec()
        .then(items => items[0].serviceProviders[0]);
    }

    promiseResultHandler(res)(queryReturn);
  },
);

//removes a appointment from customers' collection, freeing the slot on serviceproviders' collection
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
        new: true,
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
        new: true,
      },
    ).exec();
    promiseResultHandler(res)(Promise.all([appointmentDeletion, slotFreeing]));
  },
);

module.exports = router;

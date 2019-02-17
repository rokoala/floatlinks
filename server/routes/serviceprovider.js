const ServiceProviderModel = require('../models/serviceprovider.model');
const express = require('express');
const router = express.Router();
const { validate, promiseResultHandler } = require('../utils/RouteMiddleware');
const moment = require('moment');

//Create a new service provider
router.post('/', (req, res) => {
  validate(req.body, res, 'Request body is missing.');

  promiseResultHandler(res)(
    ServiceProviderModel.create(req.body),
    (res, doc, next) => {
      !doc || doc.length === 0 ? res.status(500).send(doc) : next();
    },
  );
});

router.get('/', (req, res) => {
  // res.send('test');
  promiseResultHandler(res)(ServiceProviderModel.find({}));
});

router.get('/:phone', (req, res) => {
  promiseResultHandler(res)(
    ServiceProviderModel.findOne({
      phone: req.params.phone,
    }),
  );
});

// Is this useful?
router.put('/:phone', (req, res) => {
  promiseResultHandler(res)(
    ServiceProviderModel.findOneAndUpdate(
      {
        phone: req.params.phone,
      },
      req.body,
      {
        new: true,
      },
    ),
  );
});

// Get agenda of service provider
router.get('/:id/agenda', (req, res) => {
  promiseResultHandler(res)(
    ServiceProviderModel.findById(req.params.id),
    (res, doc) => {
      res.status(200).send(doc.agenda);
    },
  );
});

// Get available hours from date
router.get('/:id/agenda/date', (req, res) => {
  promiseResultHandler(res)(
    ServiceProviderModel.find({
      _id: req.params.id,
      'agenda.slots.slotDate': {
        $gte: moment(req.body.date)
          .startOf('day')
          .toDate(),
        $lte: moment(req.body.date)
          .endOf('day')
          .toDate(),
      },
    }),
  );
});

module.exports = router;

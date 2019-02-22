const ServiceProviderModel = require('../models/serviceprovider.model');
const express = require('express');
const router = express.Router();
const { validate, promiseResultHandler } = require('../utils/RouteMiddleware');

//Create a new service provider
router.post('/', (req, res) => {
  validate(req.body, res, 'Request body is missing.');

  promiseResultHandler(res)(
    ServiceProviderModel.create(req.body),
    (res, doc, next) => {
      !doc || doc.length === 0 ? res.status(500).send(doc) : next();
    }
  );
});

router.get('/', (req, res) => {
  // res.send('test');
  promiseResultHandler(res)(ServiceProviderModel.find({}));
});

router.get('/:phone', (req, res) => {
  promiseResultHandler(res)(
    ServiceProviderModel.findOne({
      phone: req.params.phone
    })
  );
});

router.get('/:serviceProviderId/basicinfo', (req, res) => {
  promiseResultHandler(res)(
    ServiceProviderModel.findOne(
      {
        _id: req.params.serviceProviderId
      },
      '_id name phone'
    )
  );
});

router.put('/:phone', (req, res) => {
  promiseResultHandler(res)(
    ServiceProviderModel.findOneAndUpdate(
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

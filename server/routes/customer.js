const CustomerModel = require('../models/customer.model');
const express = require('express');
const router = express.Router();
const { validate, promiseResultHandler } = require('../utils/RouteMiddleware');

//Create a new customer
router.post('/', (req, res) => {
  validate(req.body, res, 'Request body is missing.');

  promiseResultHandler(res)(
    CustomerModel.create(req.body),
    (res, doc, next) => {
      !doc || doc.length === 0 ? res.status(500).send(doc) : next();
    }
  );
});

router.get('/', (req, res) => {
  // res.send('test');
  promiseResultHandler(res)(CustomerModel.find({}));
});

router.get('/:phone', (req, res) => {
  promiseResultHandler(res)(
    CustomerModel.findOne({
      phone: req.params.phone
    })
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

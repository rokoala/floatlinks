const CustomerModel = require('../models/customer.model');
const express = require('express');
const router = express.Router();
const { promiseResultHandler } = require('../utils/RouteMiddleware');

router.post('/', (req, res) => {
  const { phone } = req.body;

  CustomerModel.findOne({
    phone
  }).then(result => {
    // If the customer already exists, send back the customer
    if (result) res.json({ newUser: false, customer: result });
    else {
      console.log('creating new customer...');
      // ... or create a new one
      promiseResultHandler(res)(CustomerModel.create(req.body), (res, doc) => {
        res.status(200).json({ newUser: true, customer: doc });
      });
    }
  });
});

module.exports = router;

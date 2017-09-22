const express = require('express');
const Customer = require('../models/customer.model');

const router = express.Router();

router.post('/customers', (req, res, next) => {
  const customerToCreate = new Customer({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    credit: req.body.credit || 0,
  });
  customerToCreate.save((err, customer) => {
    if (err) {
      next({ status: 400, message: err.message });
    } else {
      res.send(customer);
    }
  });
});

router.get('/customers', (req, res, next) => {
  Customer.find({}, (err, customers) => {
    if (err) {
      next(err);
    } else {
      res.send(customers);
    }
  });
});

router.get('/customers/:customerId', (req, res, next) => {
  Customer.findById(req.params.customerId, (err, customer) => {
    if (err) {
      next({ status: 400, message: err.message });
    } else if (!customer) {
      next();
    } else {
      res.send(customer);
    }
  });
});

router.put('/customers/:customerId', (req, res, next) => {
  Customer.findById(req.params.customerId, (errFind, customer) => {
    if (errFind) {
      next({ status: 400, message: errFind.message });
    } else if (!customer) {
      next();
    } else {
      const customerToUpdate = customer;
      customerToUpdate.name = req.body.name;
      customerToUpdate.address = req.body.address;
      customerToUpdate.email = req.body.email;
      customerToUpdate.phone = req.body.phone;
      customerToUpdate.credit = req.body.credit || 0;
      customerToUpdate.save((errSave, customerUpdated) => {
        if (errSave) {
          next({ status: 400, message: errSave.message });
        } else {
          res.send(customerUpdated);
        }
      });
    }
  });
});

router.delete('/customers/:customerId', (req, res, next) => {
  Customer.findByIdAndRemove(req.params.customerId, (err, customer) => {
    if (err) {
      next({ status: 400, message: err.message });
    } else if (!customer) {
      next();
    } else {
      res.send({
        message: `Customer with id ${req.params.customerId} removed`,
      });
    }
  });
});

module.exports = router;

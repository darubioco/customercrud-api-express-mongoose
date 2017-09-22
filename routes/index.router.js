const express = require('express');

const customersRouter = require('../routes/customers.router');

const router = express.Router();
router.use('/', customersRouter);

module.exports = router;

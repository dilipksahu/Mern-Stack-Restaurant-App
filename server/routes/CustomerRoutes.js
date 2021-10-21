const express = require('express');
const CustomerRouter = express.Router();
const CustomerController = require('../controller/CustomerController');

CustomerRouter.post('/api/customer', CustomerController.add);

CustomerRouter.get('/api/customer', CustomerController.list);

module.exports = CustomerRouter;
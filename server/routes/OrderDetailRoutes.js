const express = require('express');
const OrderDetailRouter = express.Router();
const OrderDetailController = require('../controller/OrderDetailController');

OrderDetailRouter.post('/api/orderDetail', OrderDetailController.add);

OrderDetailRouter.get('/api/orderDetail', OrderDetailController.list);

module.exports = OrderDetailRouter;
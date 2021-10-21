const express = require('express');
const OrderMasterRouter = express.Router();
const OrderMasterController = require('../controller/OrderMasterController');

OrderMasterRouter.post('/api/orderMaster', OrderMasterController.add);

OrderMasterRouter.get('/api/orderMaster', OrderMasterController.list);

module.exports = OrderMasterRouter;
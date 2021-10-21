const express = require('express');
const FoodItemRouter = express.Router();
const FoodItemController = require('../controller/FoodItemController');

FoodItemRouter.post('/api/foodItem', FoodItemController.add);

FoodItemRouter.get('/api/foodItem', FoodItemController.list);

module.exports = FoodItemRouter;
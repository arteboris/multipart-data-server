const { Router } = require('express');
const ordersValidator = require('./orders.validator');
const ordersController = require('./orders.controller');

const router = Router();

router
.get('/', ordersValidator.sendOrdersUser, 
ordersController.sendOrdersUser)
.get('/:id', ordersValidator.sendOrder, 
ordersController.sendOrder)
.post('/', ordersValidator.createOrder,
ordersController.createOrder);

module.exports = router;
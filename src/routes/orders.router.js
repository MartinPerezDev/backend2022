const { Router } = require('express');
const { sendOrder, sessionChecker, getByNumberOrder } = require('../controllers/order.controller');

const ordersRouter = Router()

ordersRouter.get('/:numberOrder', sessionChecker, getByNumberOrder)
ordersRouter.post('/', sessionChecker, sendOrder)

module.exports = ordersRouter
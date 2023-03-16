const { Router } = require('express');
const { getProductsInCart, sessionChecker, AddProductsInCart, emptyCart } = require('../controllers/cart.controllers');

const cartRouter = Router()

cartRouter.get('/', sessionChecker, getProductsInCart)
cartRouter.post('/:idProduct/:quantity', sessionChecker, AddProductsInCart)
cartRouter.delete('/', sessionChecker, emptyCart)

module.exports = cartRouter
const { Router } = require('express');
const {
    getProducts,
    addProduct,
    getById,
    getByCategory,
    deleteProduct,
    updateProduct
} = require('../controllers/products.controller');

const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:id', getById)
productsRouter.get('/category/:category', getByCategory)
productsRouter.post('/', addProduct)
productsRouter.delete('/:id', deleteProduct)
productsRouter.put('/:id', updateProduct)

module.exports = productsRouter
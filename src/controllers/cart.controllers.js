const CartDao = require('../daos/CartDao')

const cartDao = new CartDao()

const getProductsInCart = async (req, res) => {
    try {
        const cart = await cartDao.getCart(req.user.email)
        res.status(200).json({ status: 200, message: "get products in cart by email", data: cart.products })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const AddProductsInCart = async (req, res) => {
    try {
        await cartDao.addProduct(req.user.email, req.params.idProduct, req.params.quantity)
        res.status(201).json({ status: 201, message: "product added to cart", data: [] })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const emptyCart = async (req, res) => {
    try {
        await cartDao.emptyCart(req.user.email)
        res.status(200).json({ status: 200, message: "empty cart", data: [] })
    } catch (error) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const sessionChecker = async (req, res, next) => {
    if (req.isAuthenticated()) {
        await cartDao.cartExist(req.user.email, req.user.address)
        next()
    } else {
        res.status(400).json({ status: 200, message: "user not authenticated", data: {} })
    }
}

module.exports = {
    getProductsInCart,
    AddProductsInCart,
    emptyCart,
    sessionChecker,
}
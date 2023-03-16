const OrderDao = require("../daos/OrderDao")
const { sendEmailOrder } = require("../utils/nodemailer.config")

const orderDao = new OrderDao()

const sendOrder = async (req, res) => {
    try {
        const order = await orderDao.sendOrder(req.user.email, req.user.address)
        await sendEmailOrder({ ...order, fullname: req.user.fullname })
        res.status(201).json({ status: 201, message: 'created order', data: order })

    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const getByNumberOrder = async (req, res) => {
    try {
        const order = await orderDao.getOrder(req.params.numberOrder)
        if (order.length) {
            res.status(200).json({ status: 200, message: 'get order', data: order })
        } else {
            res.status(400).json({ status: 400, message: 'error get order', data: [] })
        }
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const sessionChecker = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(400).json({ status: 200, message: "user not authenticated", data: {} })
    }
}

module.exports = {
    sendOrder,
    getByNumberOrder,
    sessionChecker,
}
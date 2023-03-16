const MessageDao = require("../daos/MessageDao.js")

const messageDao = new MessageDao()

const sendMessage = async (req, res) => {
    try {
        const type = 'user'
        await messageDao.send(req.user.email, req.body.message, type)
        res.status(200).json({ status: 200, message: 'send message', data: {} })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}
const getByEmail = async (req, res) => {
    try {
        const messages = await messageDao.getByEmail(req.params.email)
        res.status(200).json({ status: 200, message: 'get messages', data: messages })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}
const getAll = async (req, res) => {
    try {
        const messages = await messageDao.getAll()
        res.status(200).json({ status: 200, message: 'get all messages', data: messages })
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
    sendMessage,
    getByEmail,
    getAll,
    sessionChecker,
}
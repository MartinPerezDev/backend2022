const MessageDao = require("../daos/MessageDao.js")

const messageDao = new MessageDao()

const sendMessage = async(req, res) => {
    try {
        await messageDao.send(req.user.email, req.body.message)
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

module.exports = {
    sendMessage
}
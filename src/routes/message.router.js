const { Router } = require('express');
const { sendMessage, sessionChecker, getByEmail } = require('../controllers/message.controller');

const messageRouter = new Router()

messageRouter.post('/', sessionChecker, sendMessage)
messageRouter.get('/:email', sessionChecker, getByEmail)

module.exports = messageRouter
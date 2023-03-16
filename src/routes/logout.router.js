const { Router } = require('express');
const destroySession = require('../controllers/logout.controller');

const logoutRouter = Router()

logoutRouter.get('/', destroySession)

module.exports = logoutRouter
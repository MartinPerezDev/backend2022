const { Router } = require('express');
const passport = require('passport');
const { loginFailure, sessionChecker } = require('../controllers/login.controller');

const loginRouter = Router()

loginRouter.get('/', sessionChecker)
loginRouter.post('/',
    passport.authenticate('login', { failureRedirect: '/api/login/failure' }),
    sessionChecker
)
loginRouter.get('/failure', loginFailure)

module.exports = loginRouter
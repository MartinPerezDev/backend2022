const { Router } = require('express');
const passport = require('passport');
const { authenticateSuccess, authenticateFailure } = require('../controllers/register.controller');

const registerRouter = Router()

registerRouter.post('/', 
    passport.authenticate('register', { failureRedirect: '/api/register/failure' }), 
    authenticateSuccess
)
registerRouter.get('/failure', authenticateFailure)

module.exports = registerRouter
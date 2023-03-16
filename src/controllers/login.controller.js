const passport = require("passport")

const sessionChecker = (req, res) => {
    if (req.isAuthenticated()) {
        const user = {
            fullname: req.user.fullname,
            phone: req.user.phone,
            email: req.user.email,
        }
        res.status(200).json({ status: 200, message: 'user session active', data: user })
    } else {
        res.redirect('/api/login/failure')
    }
}
const passportAuthenticate = (req, res, next) => {
    passport.authenticate('login', function (err, user) {
        if (!user) res.redirect('/api/login/failure')
    })(req, res, next)
}

const loginFailure = (req, res) => {
    res.status(400).json({ status: 400, message: 'login failure', data: {} })
}

module.exports = {
    sessionChecker,
    passportAuthenticate,
    loginFailure
}
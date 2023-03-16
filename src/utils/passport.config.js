const passport = require('passport')
const { Strategy } = require('passport-local')
const { createHash, passwordIsValid } = require('../utils/bcrypt.config')
const UserDao = require('../daos/UserDao')

const userDao = new UserDao()

const initializePassport = () => {
    passport.use(
        'register',
        new Strategy(
            { usernameField: 'email', passReqToCallback: true },
            async (req, email, password, done) => {
                try {
                    const user = await userDao.getUserByEmail(email)
                    user && done(null, false)
                    const newUser = {
                        fullname: req.body.fullname,
                        phone: req.body.phone,
                        email,
                        address: req.body.address,
                        password: createHash(password),
                    }
                    try {
                        const res = await userDao.addUser(newUser)
                        return done(null, res)
                    } catch (err) {
                        return done(err.message)
                    }
                } catch (err) {
                    return done(err.message)
                }
            }
        )
    )

    passport.use(
        'login',
        new Strategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                try {
                    const user = await userDao.getUserByEmail(email)
                    if (!user) return done(null, false)
                    if (!passwordIsValid(user, password)) return done(null, false)
                    return done(null, user)
                } catch (err) {
                    return done(err.message)
                }
            }
        )
    )

    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((id, done) => userDao.getById(id, done))
}

module.exports = initializePassport
import passport from "passport";
import local from "passport-local"
import { UserDaoManager } from "../daos/User.dao.js";
import { createHash, isValid } from "../encrypt/encrypt.js"

const LocalStrategy = local.Strategy

export const initializePassport = () => {

    passport.use(
        'register',
        new LocalStrategy(
            { usernameField: 'email', passReqToCallback: true },
            async (req, email, password, done) => {
                try {
                    const user = await UserDaoManager.getbyEmail(email)
                    if (user) return done(null, false)
                    const newUser = {
                        email,
                        password: createHash(password),
                        name: req.body.name,
                        address: req.body.address,
                        age: req.body.age,
                        telephone: req.body.telephone,
                        image: req.body.image
                    }
                    try {
                        const result = await UserDaoManager.add(newUser)
                        return done(null, result)
                    } catch (error) {
                        done(error.message)
                    }
                } catch (error) {
                    done(error.message)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy({ usernameField: 'email'},
            async (email, password, done) => {
                try {
                    const user = await UserDaoManager.getbyEmail(email)
                    if (!user) return done(null, false)
                    if (!isValid(user, password)) return done(null, false)
                    return done(null, user)
                } catch (error) {
                    done(error)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        UserDaoManager.getById(id, done)
    })

}
import passport from "passport";
import local from "passport-local"
import { UserDaoManager } from "./daos/UserDaoDb.js";
import { createHash, isValid } from "./utils/encrypt.js";

const LocalStrategy = local.Strategy

export const initializePassport = () =>{

    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done)=>{
                try {
                    const user = await UserDaoManager.get(username)
                    if(user) return done(null, false)
                    const newUser = {
                        username,
                        password: createHash(password),
                        email: req.body.email
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
        new LocalStrategy(
            async(username, password, done)=>{
                try {
                    const user = await UserDaoManager.get(username)
                    if(!user) return done(null, false)
                    if(!isValid(user, password)) return done(null, false)
                    return done(null, user)
                } catch (error) {
                    done(error)
                }
            }
        )
    )

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    
    passport.deserializeUser((id, done)=>{
        UserDaoManager.getById(id, done)
    })

}
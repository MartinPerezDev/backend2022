import { Router } from "express";
import passport from "passport";
import { sessionChecker } from "../middlewares/login.middleware.js";
export const loginRouter = Router()

loginRouter.get("/", sessionChecker, (req, res) => {
    res.render("login", {error: false})
})

loginRouter.post("/", passport.authenticate("login", { successRedirect: "/dashboard", failureRedirect: "/failureLogin" }))
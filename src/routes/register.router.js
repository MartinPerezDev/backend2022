import { Router } from "express";
import { sessionChecker } from "../middlewares/login.middleware.js";
import passport from "passport";
export const registerRouter = Router()

registerRouter.get("/", sessionChecker, (req, res) => {
    res.render("signup", { error: false })
})
registerRouter.post("/", passport.authenticate("register", 
{ successRedirect: "/dashboard", failureRedirect: "/failureRegister" }))
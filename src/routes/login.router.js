import { Router } from "express";
import passport from "passport";
import { index } from "../controllers/login.controller.js";
import { sessionChecker } from "../middlewares/login.middleware.js";
export const loginRouter = Router()

loginRouter.get("/", sessionChecker, index)
loginRouter.post("/", passport.authenticate("login", { successRedirect: "/dashboard", failureRedirect: "/failureLogin" }))
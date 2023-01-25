import { Router } from "express";
import { index } from "../controllers/register.controller.js";
import { sessionChecker } from "../middlewares/login.middleware.js";
import passport from "passport";
export const registerRouter = Router()

registerRouter.get("/", sessionChecker, index)
registerRouter.post("/", passport.authenticate("register", { successRedirect: "/dashboard", failureRedirect: "/failureRegister" }))
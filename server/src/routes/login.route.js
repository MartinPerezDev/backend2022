import { Router } from "express";
import passport from "passport";
import { authenticateFail, authenticateSucces } from "../controllers/login.controller.js";
import { sessionChecker } from "../middlewares/login.middleware.js";
export const loginRouter = Router()

loginRouter.get("/", sessionChecker, authenticateFail)
loginRouter.post("/", passport.authenticate("login", { failureRedirect: "/failureLogin" }), authenticateSucces)
import { Router } from "express";
import { sessionChecker } from "../middlewares/login.middleware.js";
import passport from "passport";
import { authenticateFail, authenticateSucces } from "../controllers/register.controller.js";
export const registerRouter = Router()

registerRouter.get("/", sessionChecker, authenticateFail)
registerRouter.post("/", passport.authenticate("register", { failureRedirect: "/failureRegister" }), authenticateSucces)
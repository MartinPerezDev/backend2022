import { Router } from "express";
import { getUser, index } from "../controllers/login.controller.js";
import { sessionChecker } from "../middlewares/login.middleware.js";
export const loginRouter = Router()

loginRouter.get("/", sessionChecker, index)
loginRouter.post("/", getUser)
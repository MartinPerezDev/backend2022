import { Router } from "express";
import { addUser, index } from "../controllers/register.controller.js";
import { sessionChecker } from "../middlewares/login.middleware.js";
export const registerRouter = Router()

registerRouter.get("/", sessionChecker, index)
registerRouter.post("/", addUser)
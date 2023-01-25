import { Router } from "express";
import { get, addMsg } from "../controllers/messages.controller.js";
export const messagesRouter = Router();

messagesRouter.get("/", get);
messagesRouter.post("/", addMsg);
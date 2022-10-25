import { Router } from "express";
import { add, deleteById, get, getById, setById } from "../controllers/products.controller.js";

export const productsRouter = Router()

productsRouter.get("/", get)
productsRouter.get("/:id", getById)
productsRouter.post("/", add)
productsRouter.put("/:id", setById)
productsRouter.delete("/:id", deleteById)
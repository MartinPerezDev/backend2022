import { Router } from "express";
import { get, addProduct } from "../controllers/products.controller.js";
export const productsRouter = Router();

productsRouter.get("/", get)
productsRouter.post("/", addProduct)

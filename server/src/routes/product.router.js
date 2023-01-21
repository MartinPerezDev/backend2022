import { Router } from "express";
import { getProducts, addProduct } from "../controllers/product.controller.js";

export const productRouter = Router()

productRouter.get("/", getProducts)
productRouter.post("/", addProduct)
import { Router } from "express";
import { addCart, addProductIncart, deleteProductInCart, getById, sendOrder } from "../controllers/cart.controller.js";

export const cartRouter = Router()

cartRouter.post("/", addCart)
cartRouter.post("/send", sendOrder)
cartRouter.get("/:id/products", getById)
cartRouter.post("/:id/products", addProductIncart)
cartRouter.delete("/:id/products/:id_prod", deleteProductInCart)
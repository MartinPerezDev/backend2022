import { Router } from "express";
const productsRouter = Router();
import { get, getById, addProduct, setProduct, delProduct } from "../controllers/productsController.js";

productsRouter.get("/", get);
productsRouter.get("/:id", getById);
productsRouter.post("/", addProduct);
productsRouter.put("/:id", setProduct);
productsRouter.delete("/:id", delProduct);

export default productsRouter;

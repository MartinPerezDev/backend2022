"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productsRouter = void 0;

var _express = require("express");

var _productsController = require("../controllers/products.controller.js");

var productsRouter = (0, _express.Router)();
exports.productsRouter = productsRouter;
productsRouter.get("/", _productsController.get);
productsRouter.get("/:id", _productsController.getById);
productsRouter.post("/", _productsController.add);
productsRouter.put("/:id", _productsController.set);
productsRouter["delete"]("/:id", _productsController.deleteById);
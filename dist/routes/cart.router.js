"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartRouter = void 0;

var _express = require("express");

var _cartController = require("../controllers/cart.controller.js");

var cartRouter = (0, _express.Router)();
exports.cartRouter = cartRouter;
cartRouter.post("/", _cartController.addCart);
cartRouter["delete"]("/:id", _cartController.deleteById);
cartRouter.get("/:id/productos", _cartController.getById);
cartRouter.post("/:id/productos", _cartController.addProductIncart);
cartRouter["delete"]("/:id/productos/:id_prod", _cartController.deleteProductInCart);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getById = exports.deleteProductInCart = exports.deleteById = exports.addProductIncart = exports.addCart = void 0;

var _fileManager = require("../class/fileManager.js");

var dotenv = _interopRequireWildcard(require("dotenv"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config();
const fileCart = new _fileManager.FileManager("./src/data/cart.js");

const getById = async (req, res) => {
  try {
    const item = await fileCart.getById(req.params.id);
    if (item) res.send(item.products);else throw new Error("Carrito no encontrado");
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.getById = getById;

const addCart = async (req, res) => {
  try {
    res.send(await fileCart.addCart());
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.addCart = addCart;

const addProductIncart = async (req, res) => {
  try {
    res.send(await fileCart.addProductInCart(req.params.id, req.body));
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.addProductIncart = addProductIncart;

const deleteProductInCart = async (req, res) => {
  try {
    res.send(await fileCart.deleteProductInCart(req.params.id, req.params.id_prod));
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.deleteProductInCart = deleteProductInCart;

const deleteById = async (req, res) => {
  try {
    res.send(await fileCart.deleteById(req.params.id));
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.deleteById = deleteById;
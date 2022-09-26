"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.getById = exports.get = exports.deleteById = exports.add = void 0;

var _fileManager = require("../class/fileManager.js");

var dotenv = _interopRequireWildcard(require("dotenv"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config();
const admin = process.env.ADMIN;
const fileProducts = new _fileManager.FileManager("./src/data/products.js");

const get = async (req, res) => {
  try {
    res.send(await fileProducts.get());
  } catch (error) {
    res.status(400).json({
      error: "Archivo corrupto",
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.get = get;

const getById = async (req, res) => {
  try {
    const product = fileProducts.getById(req.params.id);
    if (product) res.send(await product);else throw new Error("Producto no encontrado");
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.getById = getById;

const add = async (req, res) => {
  try {
    if (admin === "true") {
      await fileProducts.addProduct(req.body);
      res.send(await fileProducts.get());
    } else {
      res.status(401).json({
        error: "Unauthorized",
        ruta: req.originalUrl,
        metodo: req.method
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.add = add;

const set = async (req, res) => {
  try {
    if (admin === "true") {
      const products = await fileProducts.set(req.body, req.params.id);
      res.send(products);
    } else {
      res.status(401).json({
        error: "Unauthorized",
        ruta: req.originalUrl,
        metodo: req.method
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.set = set;

const deleteById = async (req, res) => {
  try {
    if (admin === "true") {
      const products = await fileProducts.deleteById(req.params.id);
      res.send(products);
    } else {
      res.status(401).json({
        error: "Unauthorized",
        ruta: req.originalUrl,
        metodo: req.method
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      ruta: req.originalUrl,
      metodo: req.method
    });
  }
};

exports.deleteById = deleteById;
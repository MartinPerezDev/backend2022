"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _express = _interopRequireWildcard(require("express"));

var _productsRouter = require("./routes/products.router.js");

var dotenv = _interopRequireWildcard(require("dotenv"));

var _cartRouter = require("./routes/cart.router.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config();
var app = (0, _express["default"])();
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: true
}));
app.use(_express["default"]["static"]('public'));
var PORT = process.env.PORT || 8080;
var server = app.listen(PORT, function () {
  return console.log("server started in http://localhost:".concat(PORT));
});
server.on('error', function (error) {
  return console.log("Error en el servidor: ", error.message);
}); //Routes

app.use("/api/productos", _productsRouter.productsRouter);
app.use("/api/carrito", _cartRouter.cartRouter);
app.use(function (req, res) {
  res.status(404).json({
    error: "Not Found",
    description: "route ".concat(req.baseUrl).concat(req.url, " method ").concat(req.method, " not implement")
  });
});
"use strict";

var _express = _interopRequireWildcard(require("express"));

var _productsRouter = require("./routes/products.router.js");

var dotenv = _interopRequireWildcard(require("dotenv"));

var _cartRouter = require("./routes/cart.router.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

dotenv.config();
const app = (0, _express.default)();
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: true
}));
app.use(_express.default.static('public'));
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`server started in http://localhost:${PORT}`));
server.on('error', error => console.log(`Error en el servidor: `, error.message)); //Routes

app.use("/api/productos", _productsRouter.productsRouter);
app.use("/api/carrito", _cartRouter.cartRouter);
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    description: `route ${req.baseUrl}${req.url} method ${req.method} not implement`
  });
});
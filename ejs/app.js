import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products.js";

const app = express();

const PORT = 8080;
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
const server = app.listen(PORT, () =>
console.log(`server started http://localhost:${PORT}`)
);
server.on("error", (error) => console.log(`Error en el servidor: `, error.message));

//pug config
app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/", (req, res)=>{
  res.render("ingresar", {})
})

//Routes
app.use("/productos", productsRouter)
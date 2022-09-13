import express, { json, urlencoded } from "express";
import { engine } from 'express-handlebars';
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

//hbs config
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get("/", (req, res)=>{
  res.render("ingresar", {})
})

//Routes
app.use("/productos", productsRouter)
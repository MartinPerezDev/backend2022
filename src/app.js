import express, { json, urlencoded } from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.js"
import msgRouter from "./routes/msg.js";
import { Msg } from "./class/msgClass.js";
import { Products } from "./class/productsClass.js";
import { optionsS } from "./options/sqlite.config.js";
import { optionsM } from "./options/mysql.config.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/content", express.static("./src/public"));

const server = app.listen(PORT, () =>
  console.log(`server started http://localhost:${PORT}`)
);
server.on("error", (error) =>
  console.log(`Error en el servidor: `, error.message)
);
const io = new Server(server);

let productsManager = new Products(optionsM, "products")
let msgManager = new Msg(optionsS, "messages")

//hbs config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", (req, res) => {
  res.render("index");
});

//Routes
app.use("/productos", productsRouter);
app.use("/msg", msgRouter)

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected...`);
  productsManager.get()
    .then(prod => socket.emit("historyProducts", prod))
  socket.on("addProduct", (data) => {
    let products = [...data]
    io.emit("historyProducts", products);
  });

  msgManager.getAll().then((msg)=> socket.emit("historyChat", msg))
  socket.on("addMsg", msg=>{
    console.log(msg)
    io.emit("historyChat", msg)
  })
});

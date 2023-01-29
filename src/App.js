import express, { json, urlencoded } from 'express';
import * as dotenv from 'dotenv'
import passport from 'passport'
import { initializePassport } from './passport.config.js'
import cluster from 'cluster';
import core from 'os';
import { Server } from 'socket.io';
import compression from 'compression';
import { baseSession, connectMongoDb } from './db/db.connect.js';
import { routeConfig } from './routes/index.js';
import MessageService from './services/MessageService.js';
import ProductService from './services/ProductService.js';

export const app = express();
app.use(compression({ level: 6 }))
dotenv.config()

let PORT = process.argv[2] || 8080
let MODE = process.argv[3] || "FORK"

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/content", express.static("./src/public"));

app.use(baseSession)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


//Views
app.set('view engine', 'ejs');
app.set('views', './src/views');

connectMongoDb()

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid}`)

  if (MODE === "FORK") {
    cluster.fork();
  } else {
    for (let i = 0; i < core.cpus().length; i++) {
      cluster.fork()
    }
  }

  cluster.on('exit', () => cluster.fork())
} else {

  const server = app.listen(PORT, () => console.log(`server started in http://localhost:${PORT}`));
  server.on('error', (error) => console.log(`Error en el servidor: `, error.message));

  const io = new Server(server);
  const productService = new ProductService()
  const messageService = new MessageService()
  
  routeConfig()

  //sockets io
  io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected...`);

    productService.getProducts().then((data) => socket.emit("historyProducts", data))
    socket.on("addProduct", (data) => {
      io.emit("historyProducts", data);
    });

    messageService.getMessages().then((data) => socket.emit("historyChat", data))
    socket.on("addMsg", data => {
      io.emit("historyChat", data)
    })
  });

}


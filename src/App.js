import express, { json, urlencoded } from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv'
import { sessionChecker } from './middlewares/login.middleware.js';
import { loginRouter } from './routes/login.router.js';
import { registerRouter } from './routes/register.router.js';
import { dashboardRouter } from './routes/dashboard.router.js';
import { logoutRouter } from './routes/logout.router.js';
import MongoStore from 'connect-mongo';
import passport from 'passport'
import { initializePassport } from './passport.config.js'
import { randomsRouter } from './routes/randoms.router.js';
import cluster from 'cluster';
import core from 'os';
import { Server } from 'socket.io';
import { productsRouter } from './routes/products.router.js';
import { messagesRouter } from './routes/messages.router.js';
import { Messages } from './class/messages.class.js';
import compression from 'compression';
import pkg from 'log4js';
const { configure, getLogger } = pkg;

const app = express();
app.use(compression({ level: 6 }))
dotenv.config()

let PORT = process.argv[2] || 8080
let MODE = process.argv[3] || "FORK"

const baseSession = session({
  store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/desafio" }),
  secret: 'c0d3r',
  resave: false,
  saveUninitialized: false,
})

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

//Logs configure
configure({
  appenders: {
    consola: { type: "console" },
    warningFile: { type: "file", filename: "./src/logs/warn.log" },
    errorFile: { type: "file", filename: "./src/logs/error.log" }
  },
  categories: {
    default: { appenders: ["consola"], level: "ALL" },
    consoleAll: { appenders: ["consola"], level: "INFO" },
    warnFile: { appenders: ["warningFile"], level: "WARN" },
    errorFile: { appenders: ["errorFile"], level: "ERROR" }
  }
})
const loggerWarn = getLogger("warnFile")
//export to use in products.controller & messages.controller
export const loggerError = getLogger("errorFile")
export const loggerAllConsole = getLogger('consoleAll')

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
  let products = []
  const msgManager = new Messages("./src/data/msg.json")

  //Routes

  //middleware console.log all routes and methods
  app.use((req, res, next) => {
    loggerAllConsole.info(`route: ${req.baseUrl}${req.url} method: ${req.method}`)
    next()
  });

  app.get("/", sessionChecker, (req, res) => res.redirect("/login"))
  app.use("/info", (req, res) => { res.json({ "numero de procesos:": core.cpus().length }) })
  app.use("/api/randoms", randomsRouter)

  app.use("/login", loginRouter)
  app.get("/failureLogin", (req, res) => res.render("login", { error: true }))

  app.use("/signup", registerRouter)
  app.get("/failureRegister", (req, res) => res.render("signup", { error: true }))

  app.use("/dashboard", dashboardRouter)
  app.use("/logout", logoutRouter)

  app.use("/productos", productsRouter);
  app.use("/msg", messagesRouter);

  //sockets io
  io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected...`);

    socket.emit("historyProducts", products);
    socket.on("addProduct", (data) => {
      io.emit("historyProducts", data);
    });

    msgManager.getAll().then((msg) => socket.emit("historyChat", msg))
    socket.on("addMsg", data => {
      io.emit("historyChat", data)
    })
  });

  //Not found route
  app.use((req, res) => {
    let msgWarn = `route: ${req.baseUrl}${req.url} method: ${req.method}`
    loggerWarn.warn(msgWarn)
    loggerAllConsole.warn(msgWarn)
    res.status(404).json({ error: "Not Found", description: `${msgWarn} not implement` });
  });

}


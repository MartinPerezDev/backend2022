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

let PORT = process.argv[2] || 8080
let MODE = process.argv[3] || "FORK"

dotenv.config()
const app = express();
const baseSession = session({
  store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/desafio" }),
  secret: 'c0d3r',
  resave: false,
  saveUninitialized: false,
})

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(baseSession)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Views
app.set('view engine', 'ejs');
app.set('views', './src/views');

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

  //Routes
  app.get("/", sessionChecker, (req, res) => res.redirect("/login"))
  app.use("/info", (req, res) => { res.json({ "numero de procesos:": core.cpus().length }) })
  app.use("/api/randoms", randomsRouter)

  app.use("/login", loginRouter)
  app.get("/failureLogin", (req, res) => res.render("login", { error: true }))

  app.use("/signup", registerRouter)
  app.get("/failureRegister", (req, res) => res.render("signup", { error: true }))

  app.use("/dashboard", dashboardRouter)
  app.use("/logout", logoutRouter)

  app.use((req, res) => {
    res.status(404).json({ error: "Not Found", description: `route ${req.baseUrl}${req.url} method ${req.method} not implement` });
  });

}


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
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { infoRouter } from './routes/info.router.js';
import { randomsRouter } from './routes/randoms.router.js';


let PORT 
yargs(hideBin(process.argv))
  .command('connect', 'connecta la app al puerto ingresado', () => {
    console.log("connecting...")
  }, 
  (argv) => {
    PORT = argv.port || 8080
  })
  .parse()

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

const server = app.listen(PORT, () => console.log(`server started in http://localhost:${PORT}`));
server.on('error', (error) => console.log(`Error en el servidor: `, error.message));

//Views
app.set('view engine', 'ejs');
app.set('views', './src/views');

//Routes
app.get("/", sessionChecker, (req, res) => res.redirect("/login"))
app.use("/info", infoRouter)
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

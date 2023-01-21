import express, { json, urlencoded } from "express"
import * as dotenv from "dotenv"
import { loggerAllConsole, loggerError } from "./logs-configure/logs.configure.js";
import { initializePassport } from "./passport/passport.config.js";
import passport from 'passport';
import { registerRouter } from "./routes/register.route.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from "cors";
import { loginRouter } from './routes/login.route.js';
import { logoutRouter } from './routes/logout.router.js';
import { cartRouter } from './routes/cart.router.js';
import { connectMongoDb } from "./db/db.connect.js";
import cluster from 'cluster';
import core from 'os';
import { productRouter } from './routes/product.router.js';

const app = express()
dotenv.config()

let PORT = process.argv[2] || 8080
let MODE = process.argv[3] || "FORK"

const baseSession = session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URI }),
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: false,
})

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

//Passport
app.use(baseSession)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

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

    const server = app.listen(PORT, () => loggerAllConsole.info(`server started in http://localhost:${PORT}`));
    connectMongoDb()
    server.on('error', (error) => {
        loggerAllConsole.error("Error en el servidor")
        loggerError.error(error.message)
    });

    //Routes
    app.use("/api/signup", registerRouter)
    app.use("/api/login", loginRouter)
    app.use("/api/logout", logoutRouter)
    app.use("/api/cart", cartRouter)
    app.use("/api/product", productRouter)

    //Not found route
    app.use((req, res) => {
        let msgWarn = `route: ${req.baseUrl}${req.url} method: ${req.method}`
        loggerAllConsole.warn(msgWarn)
        res.status(404).json({ error: "Not Found", description: `${msgWarn} not implement` });
    });
    
}
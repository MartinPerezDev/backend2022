import { sessionChecker } from '../middlewares/login.middleware.js';
import { loginRouter } from '../routes/login.router.js';
import { registerRouter } from '../routes/register.router.js';
import { dashboardRouter } from '../routes/dashboard.router.js';
import { logoutRouter } from '../routes/logout.router.js';
import { randomsRouter } from '../routes/randoms.router.js';
import { productsRouter } from '../routes/products.router.js';
import { messagesRouter } from '../routes/messages.router.js';
import { loggerAllConsole, loggerWarn } from '../logs/logs.configure.js';
import { app } from "../App.js";

export const routeConfig = () => {
    //middleware console.log all routes and methods
    app.use((req, res, next) => {
        loggerAllConsole.info(`route: ${req.baseUrl}${req.url} method: ${req.method}`)
        next()
    });

    app.get("/", sessionChecker, (req, res) => res.redirect("/login"))
    app.use("/info", (req, res) => { res.json({ "numero de procesos:": core.cpus().length }) })
    app.use("/api/randoms", randomsRouter)

    app.use("/login", loginRouter)
    app.use("/logout", logoutRouter)
    app.get("/failureLogin", (req, res) => res.render("login", { error: true }))

    app.use("/signup", registerRouter)
    app.get("/failureRegister", (req, res) => res.render("signup", { error: true }))

    app.use("/dashboard", dashboardRouter)

    app.use("/productos", productsRouter);
    app.use("/msg", messagesRouter);

    //Not found route
    app.use((req, res) => {
        let msgWarn = `route: ${req.baseUrl}${req.url} method: ${req.method}`
        loggerWarn.warn(msgWarn)
        loggerAllConsole.warn(msgWarn)
        res.status(404).json({ error: "Not Found", description: `${msgWarn} not implement` });
    });
}
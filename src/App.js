import cookieParser from 'cookie-parser';
import express, { json, urlencoded } from 'express';
import session from 'express-session';
import * as dotenv from 'dotenv'
import { sessionChecker } from './middlewares/login.middleware.js';
import { loginRouter } from './routes/login.router.js';
import { registerRouter } from './routes/register.router.js';
import { dashboardRouter } from './routes/dashboard.router.js';
import { logoutRouter } from './routes/logout.router.js';
dotenv.config()

const PORT = process.env.PORT || 8080;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'c0d3r',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))

const server = app.listen(PORT, () => console.log(`server started in http://localhost:${PORT}`));
server.on('error', (error) => console.log(`Error en el servidor: `, error.message));

//Views
app.set('view engine', 'ejs');
app.set('views', './src/views');

//Routes
app.get("/", sessionChecker, (req, res) => res.redirect("/login"))
app.use("/login", loginRouter)
app.use("/signup", registerRouter)
app.use("/dashboard", dashboardRouter)
app.use("/logout", logoutRouter)


app.use((req, res) => {
    res.status(404).json({error: "Not Found", description: `route ${req.baseUrl}${req.url} method ${req.method} not implement`});
});

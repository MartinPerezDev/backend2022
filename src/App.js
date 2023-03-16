const express = require("express")
const passport = require("passport")
const { Server } = require("socket.io")
const { connectMongoDb } = require("./db/db.connect")
const cartRouter = require("./routes/cart.router")
const loginRouter = require("./routes/login.route")
const logoutRouter = require("./routes/logout.router")
const ordersRouter = require("./routes/orders.router")
const productsRouter = require("./routes/products.route")
const registerRouter = require("./routes/register.router")
const mongoSession = require("./utils/mongo.session")
const initializePassport = require("./utils/passport.config")
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static('public'))

//passport
app.use(mongoSession)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

connectMongoDb()
const server = app.listen(PORT, () => console.log(`server started in http://localhost:${PORT}`))
server.on('error', (err) => console.log(`Error to start server: ${err.message}`))


app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/orders', ordersRouter)

app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found', description: `route: ${req.baseUrl}${req.url}`, method: `${req.method} not implement`
    })
})

module.exports = {
    server
}
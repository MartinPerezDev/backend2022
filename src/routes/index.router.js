const cartRouter = require("./cart.router")
const loginRouter = require("./login.route")
const logoutRouter = require("./logout.router")
const messageRouter = require("./message.router")
const ordersRouter = require("./orders.router")
const productsRouter = require("./products.route")
const registerRouter = require("./register.router")

const routerConfig = (app) => {
    app.use('/api/products', productsRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/register', registerRouter)
    app.use('/api/login', loginRouter)
    app.use('/api/logout', logoutRouter)
    app.use('/api/orders', ordersRouter)
    app.use('/api/chat', messageRouter)

    app.use((req, res) => {
        res.status(404).json({
            error: 'Not Found', description: `route: ${req.baseUrl}${req.url}`, method: `${req.method} not implement`
        })
    })
}

module.exports = routerConfig
const express = require("express")
const passport = require("passport")
const { connectMongoDb } = require("./db/db.connect")
const routerConfig = require("./routes/index.router")
const mongoSession = require("./utils/mongo.session")
const initializePassport = require("./utils/passport.config")
const socketIo = require("./utils/socket.io")
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//passport
app.use(mongoSession)
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

connectMongoDb()
const server = app.listen(PORT, () => console.log(`server started in http://localhost:${PORT}`))
server.on('error', (err) => console.log(`Error to start server: ${err.message}`))
socketIo(server)
routerConfig(app)

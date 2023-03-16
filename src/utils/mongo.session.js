const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()


const mongoSession = session({
    store: MongoStore.create({ mongoUrl:  process.env.URI_MONGO_DB}),
    secret: 'c0der',
    resave: false,
    saveUninitialized: false,
})

module.exports = mongoSession
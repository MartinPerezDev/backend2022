const session = require('express-session')
const MongoStore = require('connect-mongo')
require('dotenv').config()

const time = process.env.TIME_SESSION_EXPIRE * 60000
const mongoSession = session({
    store: MongoStore.create({ mongoUrl:  process.env.URI_MONGO_DB}),
    secret: 'c0der',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: time
    }
})

module.exports = mongoSession
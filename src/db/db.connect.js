const { connect } = require('mongoose')
require('dotenv').config()

const connectMongoDb = () => {
    try {
        connect(process.env.URI_MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongo Db connected')
    } catch (err) {
        console.log("Error to connect Mongo Db", err.message)
    }
}

module.exports = { connectMongoDb }
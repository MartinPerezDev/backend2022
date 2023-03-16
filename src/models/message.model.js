const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: { type: Date, default: Date.now },
    email: { type: String, require: true },
    type: { type: String, required: true },
    body: { type: String, required: true },
})

const messageSchema = model('messages', MessageSchema) 

module.exports = messageSchema
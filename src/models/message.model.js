const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: { type: Date, default: Date.now },
    email: { type: Date, require: true },
    type: { type: String, default: 'user' },
    body: { type: String, required: true },
})

const messageSchema = model('messages', MessageSchema) 

module.exports = messageSchema
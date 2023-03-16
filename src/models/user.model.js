const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: { type: Date, default: Date.now },
    fullname: { type: String, required: true },
    phone: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
})

const userSchema = model('users', UserSchema)

module.exports = userSchema
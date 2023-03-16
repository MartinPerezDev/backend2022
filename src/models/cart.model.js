const { Schema, model } = require('mongoose')

const CartSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: { type: Date, default: Date.now },
    products : { type: Array, default: [] },
    email: { type: String, required: true, unique: true},
    address: { type: String, required: true },
})

const cartSchema = model('carts', CartSchema)

module.exports = cartSchema
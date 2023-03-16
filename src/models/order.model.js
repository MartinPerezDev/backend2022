const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: { type: Date, default: Date.now },
    state: { type: String, default: 'generated' },
    email: { type: String, required: true },
    order: { type: Number, required: true, unique: true },
    products: { type: Array, required: true },
    address: { type: String, required: true },
})

const orderSchema = model('orders', OrderSchema)

module.exports = orderSchema
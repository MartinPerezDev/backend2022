const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: { type: Date, default: Date.now },
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
})

const productSchema = model('products', ProductSchema)

module.exports = productSchema
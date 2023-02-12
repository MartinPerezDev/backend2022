import { Schema, model } from "mongoose"

const ProductSchema = new Schema({
    id: Schema.ObjectId,
    name: { type: String, require: true },
    description: { type: String },
    price: { type: Number, require: true }
})

const productSchema = model("products", ProductSchema)

export default productSchema


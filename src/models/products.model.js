import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: {type: Date, default: Date.now},
    name: {type: String, require: true , max: 30},
    description: {type: String, require: true , max: 100},
    code: {type: String, require: true , max: 30},
    pic: {type: String, require: true},
    price: {type: Number, require: true , max: 50000},
    stock: {type: Number, require: true , max: 1000}
})

export const productsSchema = mongoose.model("products", ProductsSchema)
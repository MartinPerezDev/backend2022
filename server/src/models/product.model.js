import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: Schema.ObjectId,
  timestamp: { type: Date, default: Date.now }, 
  name: { type: String, required: true},
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }
});

export const productSchema = mongoose.model("products", ProductSchema);
import mongoose from "mongoose";
const { Schema } = mongoose;

const CartsSchema = new Schema({
  id: Schema.ObjectId,
  timestamp: { type: Date, default: Date.now }, 
  products: { type: Array },
});

export const cartsSchema = mongoose.model("carts", CartsSchema);

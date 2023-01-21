import mongoose from "mongoose";
const { Schema } = mongoose;

const CartSchema = new Schema({
  id: Schema.ObjectId,
  timestamp: { type: Date, default: Date.now }, 
  products: { type: Array },
});

export const cartSchema = mongoose.model("carts", CartSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: { type: Date, default: Date.now },
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true},
    name: { type: String, require: true },
    address: { type: String, require: true},
    age: { type: Number, require: true },
    telephone: { type: String, require: true },
    image: { type: String, require: true}
})

export const userSchema = mongoose.model("users", UserSchema)
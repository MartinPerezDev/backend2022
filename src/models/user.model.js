import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: { type: Date, default: Date.now },
    username: { type: String, require: true },
    password: { type: String, require: true},
    email: { type: String, require: true}
})

export const userSchema = mongoose.model("users", UserSchema)
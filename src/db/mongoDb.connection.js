import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const mongoDbConnection = async () => {
  try {
    mongoose.connect(process.env.URI_MONGO_DB);
    console.log("Mongo Db Connected")
  } catch (error) {
    console.log("Error connection mongo db")
  }
};

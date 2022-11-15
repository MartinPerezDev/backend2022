import ContainerMongoDb from "../containers/ContainerMongoDb.js";
import { userSchema } from "../models/user.model.js";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

class UserDao extends ContainerMongoDb{
    constructor(){
        super(userSchema)
        try {
            mongoose.connect(process.env.URI_MONGO_DB)
            console.log("Mongo Db Connected")
        } catch (error) {
            console.log("Error connection mongo db")
        }
    }
}

export const UserDaoManager = new UserDao
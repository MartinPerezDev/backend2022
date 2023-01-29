import { userSchema } from "../models/user.model.js";
import * as dotenv from 'dotenv'
dotenv.config()

class UsersDao {
    constructor(){
        this.schema = userSchema
    }

    async get(username){
        try {
            return await this.schema.findOne({ username })
        } catch (error) {
            throw new Error("Error to get user");
        }
    }

    async add(user){
        try {
            return await this.schema(user).save()
        } catch (error) {
            throw new Error("Error to add user");
        }
    }
    
    async getById(id, done){
        try {
            this.schema.findById(id, done)
        } catch (error) {
            throw new Error("Error to get by id user");
        }
    }
}

export const UserDaoManager = new UsersDao
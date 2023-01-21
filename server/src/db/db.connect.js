import mongoose from "mongoose";
import * as dotenv from "dotenv"
import { loggerAllConsole, loggerError } from './../logs-configure/logs.configure.js';
dotenv.config()

export const connectMongoDb = async()=>{
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
            () => {
                loggerAllConsole.info("Mongo Db Connected");
            }
        )
    } catch (error) {
        loggerAllConsole.info("Error connecting to db")
        loggerError.error(error.message)
    }
}
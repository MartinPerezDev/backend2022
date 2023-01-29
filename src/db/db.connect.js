import session from 'express-session';
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import * as dotenv from 'dotenv'
import { sendError } from '../utils/sendError.js';
import { loggerAllConsole } from '../logs/logs.configure.js';

dotenv.config()

export const baseSession = session({
    store: MongoStore.create({ mongoUrl: process.env.URI_MONGO_DB }),
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
})

export const connectMongoDb = async () => {
    try {
        mongoose.connect(process.env.URI_MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
            () => {
                loggerAllConsole.info("Mongo Db connected!")
            }
        )
    } catch (error) {
        sendError("Error to connect Mongo Db", error.message)
    }
}
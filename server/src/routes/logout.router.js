import { Router } from "express";
import { loggerAllConsole, loggerError } from './../logs-configure/logs.configure.js';
export const logoutRouter = Router()

logoutRouter.get("/", (req,res)=> {
    try {
        req.session.destroy()
        res.status(200).json({msg: "logout success"})
    } catch (error) {
        loggerAllConsole.error("Error to logout user")
        loggerError.error(error.message)
    }
})
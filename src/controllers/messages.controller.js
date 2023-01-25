import { Messages } from "../class/messages.class.js";
import moment from "moment/moment.js";
import { loggerAllConsole, loggerError } from "../logs/logs.configure.js";

const msg = new Messages("./src/data/msg.json")

export const get = async (req, res)=>{
    try{
        res.send(msg.getAll())
    }
    catch(error){
        let msgError = `route: ${req.baseUrl}${req.url} method: ${req.method}`
        loggerError.error(msgError)
        loggerAllConsole.error(msgError)
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const addMsg = async (req, res)=>{
    try{
        let newMsg = req.body
        newMsg = {...newMsg, fyh: moment().format("DD/MM/YYYY HH:mm")}
        if(newMsg){
            res.send(await msg.save(newMsg))
        }else{
            throw new Error("Error al recibir data")
        }
    }
    catch(error){
        let msgError = `route: ${req.baseUrl}${req.url} method: ${req.method}`
        loggerError.error(msgError)
        loggerAllConsole.error(msgError)
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
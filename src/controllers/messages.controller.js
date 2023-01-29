import MessageService from "../services/MessageService.js";
import moment from "moment/moment.js";
import { sendError } from "../utils/sendError.js";
import MessageDTO from "../dtos/MessageDTO.js";

const messageService = new MessageService()

export const get = async (req, res) => {
    try {
        const messages = await messageService.getMessages()
        let resultDTO = messages.map(message => new MessageDTO(message))
        res.send(resultDTO)
    }
    catch (error) {
        sendError("Error to get messages", error.message)
        res.status(400).json({ error: error.message, ruta: req.originalUrl, metodo: req.method })
    }
}

export const addMsg = async (req, res) => {
    try {
        let newMsg = req.body
        newMsg = { ...newMsg, fyh: moment().format("DD/MM/YYYY HH:mm") }
        if (newMsg) {
            const messages = await messageService.addMessage(newMsg)
            let resultDTO = messages.map(message => new MessageDTO(message))
            res.send(resultDTO)
        } else {
            throw new Error("Error to get data")
        }
    }
    catch (error) {
        sendError("Error to add message", error.message)
        res.status(400).json({ error: error.message, ruta: req.originalUrl, metodo: req.method })
    }
}
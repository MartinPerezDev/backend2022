import twilio from 'twilio';
import * as dotenv from "dotenv"
import { loggerAllConsole, loggerError } from './../logs-configure/logs.configure.js';

dotenv.config()
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSms = async()=>{
    client.messages
    .create({ body: "Estimado cliente su pedido ha sido recibido y esta siendo preparado", from: "+16062176768", to: "+541169637384" })
    .then(message => true)
    .catch(error => {
        loggerAllConsole.error("Error to send sms")
        loggerError.error(error.message)
    })
}
import { loggerAllConsole, loggerError } from "../logs/logs.configure.js"

export const sendError = (msg, error) => {
    loggerAllConsole.error(msg)
    loggerError.error(error)
}
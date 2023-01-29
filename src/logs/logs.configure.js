import pkg from 'log4js';
const { configure, getLogger } = pkg;

//Logs configure
configure({
    appenders: {
        consola: { type: "console" },
        warningFile: { type: "file", filename: "./src/logs/warn.log" },
        errorFile: { type: "file", filename: "./src/logs/error.log" }
    },
    categories: {
        default: { appenders: ["consola"], level: "ALL" },
        consoleAll: { appenders: ["consola"], level: "INFO" },
        warnFile: { appenders: ["warningFile"], level: "WARN" },
        errorFile: { appenders: ["errorFile"], level: "ERROR" }
    }
})

export const loggerWarn = getLogger("warnFile")
export const loggerError = getLogger("errorFile")
export const loggerAllConsole = getLogger('consoleAll')
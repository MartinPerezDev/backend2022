import { Router } from "express";
import * as dotenv from 'dotenv'
dotenv.config()

export const infoRouter = Router()

infoRouter.get("/", (req, res) => {
    res.json({
        "argumentos de entrada" : process.argv.splice(2),
        "nombre de plataforma" : process.platform,
        "version de node": process.version,
        "memoria usada(rss)": process.memoryUsage().rss,
        "path de ejecucion" : process.execPath,
        "process id" : process.pid,
        "carpeta del proyecto" : process.argv[1]
    })
})
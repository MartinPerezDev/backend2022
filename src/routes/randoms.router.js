import { Router } from "express";
import { fork } from 'child_process';

export const randomsRouter = Router()

randomsRouter.get("/", (req, res) => {
    const contador = fork("./src/utils/random.js")
    contador.send(req.query.cant || 1000000)
    contador.on("message", msg=>{
        res.send(msg)
    })
})
import { ProductsDaoManager } from '../daos/index.js'
import * as dotenv from 'dotenv'
dotenv.config()

const admin = process.env.ADMIN

export const get = async (req, res)=>{
    try{
        res.send(await ProductsDaoManager.get())
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const getById = async (req, res)=>{
    try{
        const product = ProductsDaoManager.getById(req.params.id)
        if(product) res.send( await product)
        else throw new Error("Producto no encontrado")
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const add = async (req, res)=>{
    try{
        if(admin === "true"){
            const products = await ProductsDaoManager.addProduct(req.body)
            res.send(products)
        }else{
            res.status(401).json({error: "Unauthorized", ruta: req.originalUrl, metodo: req.method})
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const setById = async (req, res)=>{
    try{
        if(admin === "true"){
            const products = await ProductsDaoManager.setById(req.body, req.params.id)
            res.send(products)
        }else{
            res.status(401).json({error: "Unauthorized", ruta: req.originalUrl, metodo: req.method})
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const deleteById = async(req, res)=>{
    try{
        if(admin === "true"){
            const products = await ProductsDaoManager.deleteById(req.params.id)
            res.send(products)
        }else{
            res.status(401).json({error: "Unauthorized", ruta: req.originalUrl, metodo: req.method})
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

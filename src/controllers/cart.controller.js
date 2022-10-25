import { CartsDaoManager } from "../daos/index.js"

export const getById = async (req, res)=>{
    try{
        const cart = await CartsDaoManager.getById(req.params.id)
        if(cart) res.send(await cart)
        else throw new Error("Producto no encontrado")
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const addCart = async (req, res)=>{
    try{
        res.send(await CartsDaoManager.addCart())
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const addProductIncart = async (req, res)=>{
    try{
        res.send(await CartsDaoManager.addProductInCart(req.params.id, req.body))
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const deleteProductInCart = async (req, res)=>{
    try{
        res.send(await CartsDaoManager.deleteProductInCart(req.params.id, req.params.id_prod))
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const deleteById = async(req, res)=>{
    try{ 
        res.send(await CartsDaoManager.deleteById(req.params.id))
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

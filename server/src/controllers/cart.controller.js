import { CartDaoManager } from "../daos/Cart.dao.js"
import { sendSms } from './../twilio/twilio.config.js';

export const getById = async (req, res)=>{
    try{
        const cart = await CartDaoManager.getByIdCart(req.params.id)
        if(cart) res.send(await cart)
        else throw new Error("Producto no encontrado")
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const addCart = async (req, res)=>{
    try{
        res.send(await CartDaoManager.addCart())
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const addProductIncart = async (req, res)=>{
    try{
        res.send(await CartDaoManager.addProductInCart(req.params.id, req.body))
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const deleteProductInCart = async (req, res)=>{
    try{
        res.send(await CartDaoManager.deleteProductInCart(req.params.id, req.params.id_prod))
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const sendOrder = async(req, res)=>{
    try{
        await CartDaoManager.send(req.body.user, req.body.cart)
        await CartDaoManager.dumpById(req.body.idCart)
        await sendSms()
        res.status(200).json({msg: "Order Success"})
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

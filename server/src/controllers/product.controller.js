import { ProductDaoManager } from "../daos/Product.dao.js"

export const getProducts = async (req, res)=>{
    try{
        res.send(await ProductDaoManager.get())
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export const addProduct = async (req, res)=>{
    try{
        await ProductDaoManager.add(req.body)
        res.status(200).json({msg: "product add"})
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
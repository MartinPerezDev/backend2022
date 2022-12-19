import { Products } from "../class/products.class.js"
import { loggerError, loggerAllConsole } from "../App.js"

const products = new Products()

export const get = async (req, res)=>{
    try{
        const jsonProducts = await products.get()
        res.send(jsonProducts)
    }
    catch(error){
        let msgError = `route: ${req.baseUrl}${req.url} method: ${req.method}`
        loggerError.error(msgError)
        loggerAllConsole.error(msgError)
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
// const getById = async (req, res)=>{
//     try{
//         const product = await products.getById(req.params.id)
//         if(product){
//             res.status(200).json(product)
//         }else{
//             throw new Error("producto no disponible")
//         }
//     }
//     catch(error){
//         res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
//     }
// }
export const addProduct = async (req, res)=>{
    try{
        const product = req.body
        if(product){
            const newProducts = await products.addProduct(product)
            res.send(newProducts)
        }else{
            throw new Error("Error al recibir data")
        }
    }
    catch(error){
        let msgError = `route: ${req.baseUrl}${req.url} method: ${req.method}`
        loggerError.error(msgError)
        loggerAllConsole.error(msgError)
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
// const setProduct = async (req, res)=>{
//     try{
//         const product = req.body
//         const id = req.params.id
//         if(product && id){
//             await products.setProduct(product, id)
//             res.status(200).send(`Producto actualizado con id: ${id}`)
//         }else{
//             throw new Error("Error al recibir data")
//         }
//     }
//     catch(error){
//         res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
//     }
// }
// const delProduct = async (req, res)=>{
//     try{
//         const id = req.params.id
//         await products.delProduct(id)
//         res.status(200).send(`Producto eliminado con id: ${id}`)
//     }
//     catch(error){
//         res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
//     }
// }

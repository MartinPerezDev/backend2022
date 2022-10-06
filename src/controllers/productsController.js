import { Products } from "../class/productsClass.js"
import { optionsM } from "../options/mysql.config.js"

const products = new Products(optionsM, "products");

const get = async (req, res)=>{
    try{
        const jsonProducts = await products.get()
        res.send(jsonProducts)
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}
const addProduct = async (req, res)=>{
    try{
        const product = req.body
        if(product){
            const newProducts = await products.addProduct(product)
            res.send(newProducts)
        }else{
            throw Error("Error al recibir data")
        }
    }
    catch(error){
        res.status(400).json({error: error.message, ruta: req.originalUrl, metodo: req.method})
    }
}

export { get, addProduct }
import ProductService from "../services/ProductService.js"
import { sendError } from "../utils/sendError.js"
import ProductDTO from "../dtos/ProductDTO.js"

const productService = new ProductService()

export const get = async (req, res) => {
    try {
        const products = await productService.getProducts();
        let resultDTO = products.map(product => new ProductDTO(product))
        res.send(resultDTO)
    }
    catch (error) {
        sendError("Error to get products", error.message)
        res.status(400).json({ error: error.message, ruta: req.originalUrl, metodo: req.method })
    }
}
export const addProduct = async (req, res) => {
    try {
        const product = req.body
        if (product) {
            const products = await productService.addProduct(product)
            let resultDTO = products.map(product => new ProductDTO(product))
            res.send(resultDTO)
        } else {
            throw new Error("Error to get data")
        }
    }
    catch (error) {
        sendError("Error to add product", error.message)
        res.status(400).json({ error: error.message, ruta: req.originalUrl, metodo: req.method })
    }
}
const ProductsDao = require('../daos/ProductsDao')

const productsDao = new ProductsDao()

const getProducts = async (req, res) => {
    try {
        const products = await productsDao.get()
        res.status(200).json({ status: 200, message: "get all products", data: products })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const getById = async (req, res) => {
    try {
        const product = await productsDao.getById(req.params.id)
        product ?
            res.status(200).json({ status: 200, message: "get product by id", data: product }) :
            res.status(404).json({ status: 404, message: "get product by id not found", data: {} })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const getByCategory = async (req, res) => {
    try {
        const product = await productsDao.getByCategory(req.params.category)
        res.status(200).json({ status: 200, message: "get products by category", data: product })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await productsDao.add(req.body)
        res.status(201).json({ status: 201, message: "added product", data: product })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const deleteProduct = async (req, res) => {
    try {
        await productsDao.deleteById(req.params.id)
        res.status(200).json({ status: 200, message: "deleted product by id", data: {} })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

const updateProduct = async (req, res) => {
    try {
        await productsDao.updateById(req.params.id, req.body)
        res.status(200).json({ status: 200, message: "updated product by id", data: {} })
    } catch (err) {
        res.status(400).json({ err: err.message, ruta: req.originalUrl, metodo: req.method })
    }
}

module.exports = {
    getProducts,
    getById,
    getByCategory,
    addProduct,
    deleteProduct,
    updateProduct,
}
const cartSchema = require('../models/cart.model')
const ProductsDao = require('../daos/ProductsDao')

const productsDao = new ProductsDao()

class CartDao {
    constructor() {
        this.schema = cartSchema
    }

    async cartExist(email, address) {
        try {
            if (await this.schema.findOne({ email })) {
                return
            } else {
                await this.createCart(email, address)
                return
            }
        } catch (err) {
            throw new Error('Error to evaluate if cart exist')
        }
    }

    async getCart(email) {
        try {
            return await this.schema.findOne({ email })
        } catch (err) {
            throw new Error('Error to get cart by email')
        }
    }

    async createCart(email, address) {
        try {
            const newCart = {
                products: [],
                email,
                address
            }
            return await this.schema(newCart).save()
        } catch (err) {
            throw new Error('Error to create cart')
        }
    }

    async addProduct(email, idProduct, quantity) {
        try {
            const cart = await this.getCart(email)
            let products = cart.products
            if (products.some((res) => String(res._id) === idProduct)) {
                products.map((res) => {
                    if (String(res._id) === idProduct) {
                        res.quantity += +quantity
                    }
                })
                await this.schema.updateOne({ email }, {
                    '$set': { products }
                })
                return
            } else {
                const { _id, name, description, price, image, category } = await productsDao.getById(idProduct)
                await this.schema.updateOne({ email }, {
                    '$push': {
                        products: {
                            _id, name, description, price, image, category, quantity: 1
                        }
                    }
                })
                return
            }
        } catch (err) {
            throw new Error('Error to add product in cart')
        }
    }

    async emptyCart(email) {
        try {
            await this.schema.deleteOne({ email })
            return
        } catch (err) {
            throw new Error('Error to empty cart')
        }
    }

}

module.exports = CartDao
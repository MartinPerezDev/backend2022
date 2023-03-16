const productSchema = require('../models/product.model')

class ProductsDao {
    constructor() {
        this.schema = productSchema
    }

    async get() {
        try {
            return await this.schema.find()
        } catch (err) {
            throw new Error('Error to get all products')
        }
    }
    async getById(id) {
        try {
            return await this.schema.findById(id)
        } catch (err) {
            throw new Error("Error to get by id product")
        }
    }
    async getByCategory(category) {
        try {
            return await this.schema.find({ category })
        } catch (err) {
            throw new Error("Error to get by category products")
        }
    }
    async add(product) {
        try {
            return await this.schema(product).save()
        } catch (err) {
            throw new Error('Error to add product')
        }
    }
    async deleteById(id) {
        try {
            return await this.schema.deleteOne({ _id: id })
        } catch (err) {
            throw new Error('Error to delete product by id')
        }
    }
    async updateById(id, product) {
        try {
            return await this.schema.updateOne({ _id: id }, product)
        } catch (err) {
            throw new Error('Error to updated product by id')
        }
    }
}

module.exports = ProductsDao
const orderSchema = require('../models/order.model')

const CartDao = require('./CartDao')
const cartSchema = new CartDao()

class OrderDao {
    constructor() {
        this.schema = orderSchema
    }

    async numberOrder() {
        try {
            const orders = await this.schema.find()
            if (orders.length === 0) {
                return 1
            } else {
                return orders.length + 1
            }
        } catch (err) {
            throw new Error('Error to generate number of order')
        }
    }

    async sendOrder(email, address) {
        try {
            const { products } = await cartSchema.getCart(email)
            const numberOrder = await this.numberOrder()
            const dataOrder = {
                email,
                order: numberOrder,
                products,
                address
            }
            await this.schema(dataOrder).save()
            return dataOrder
        } catch (error) {
            throw new Error('Error to send Order')
        }
    }

    async getOrder(numberOrder) {
        try {
            return await this.schema.find({ order: numberOrder })
        } catch (error) {
            throw new Error('Error get order')
        }
    }
}

module.exports = OrderDao
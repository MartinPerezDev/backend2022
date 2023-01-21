import { loggerAllConsole, loggerError } from "../logs-configure/logs.configure.js";
import { sendEmailOrder } from "../nodemailer/nodemailer.config.js";

export default class ContainerMongoDb {
    constructor(schema) {
        this.schema = schema
    }

    //User
    async getbyEmail(email) {
        try {
            return await this.schema.findOne({ email })
        } catch (error) {
            loggerAllConsole.info(error)
            loggerError.error(error.message)
        }
    }

    async add(item) {
        try {
            return await this.schema(item).save()
        } catch (error) {
            loggerAllConsole.info("Error to add item")
            loggerError.error(error.message)
        }
    }

    async getById(id, done) {
        try {
            this.schema.findById(id, done)
        } catch (error) {
            loggerAllConsole.info("Error to get by id user")
            loggerError.error(error.message)
        }
    }

    //Cart

    async getByIdCart(id) {
        try {
            const data = await this.schema.findById(id)
            return data.products
        } catch (error) {
            loggerAllConsole.info("Error to get by id cart")
            loggerError.error(error.message)
        }
    }

    async addCart() {
        try {
            const item = await this.schema({ "products": [] }).save();
            return ({ id: item._id });
        } catch (error) {
            loggerAllConsole.info("Error to add cart")
            loggerError.error(error.message)
        }
    }

    async addProductInCart(id, item) {
        try {
            const doc = await this.schema.findById(id);
            doc.products = [...doc.products, item];
            const data = await doc.save();
            return data.products
        } catch (error) {
            loggerAllConsole.info("Error to add product in cart")
            loggerError.error(error.message)
        }
    }

    async deleteProductInCart(id, id_prod) {
        try {
            const doc = await this.schema.findById(id);
            doc.products = await doc.products.filter(res => res._id !== id_prod)
            await doc.save()
            return this.getByIdCart(id)
        } catch (error) {
            loggerAllConsole.info("Error to delete product in cart")
            loggerError.error(error.message)
        }
    }

    async send(user, products) {
        try {
            await sendEmailOrder(user, products)
        } catch (error) {
            loggerAllConsole.info("Error to delete product in cart")
            loggerError.error(error.message)
        }
    }

    async dumpById(id_cart) {
        try {
            const doc = await this.schema.findById(id_cart);
            doc.products = []
            await doc.save()
        } catch (error) {
            loggerAllConsole.info("Error to dump products in cart")
            loggerError.error(error.message)
        }
    }

    //Product
    async get() {
        try {
            return await this.schema.find()
        } catch (error) {
            loggerAllConsole.info("Error get products")
            loggerError.error(error.message)
        }
    }
}
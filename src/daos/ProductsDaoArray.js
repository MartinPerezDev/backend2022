import { lastId } from "../utils/lastId.js";

export default class ProductsDaoArray {
    constructor() {
        this.products = [];
    }

    async get() {
        try {
            return this.products;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async add(product) {
        try {
            let newId = await lastId(this.products);
            this.products = [...this.products, { id: newId, ...product }];
            return this.products;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

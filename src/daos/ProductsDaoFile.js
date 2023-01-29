import { constants, writeFile } from "node:fs";
import { readFile, access } from "node:fs/promises";
import { lastId } from "../utils/lastId.js";

export default class ProductsDaoFile {
    constructor() {
        this.path = "./src/data/products.json";
        this.verifiedArchive()
        this.products = this.get()
    }

    async verifiedArchive() {
        try {
            await access(this.path, constants.R_OK);
        } catch {
            writeFile(this.path, JSON.stringify("[]", null, 2), (err) => {
                !err && console.log("archivo creado!");
            });
        }
    }

    async get() {
        try {
            if (await readFile(this.path, "utf-8") !== []) {
                return this.products = JSON.parse(await readFile(this.path, "utf-8"))
            }
            return null
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async add(product) {
        try {
            await this.get();
            const newId = await lastId(this.products);
            this.products = [...this.products, { id: newId, ...product }];
            writeFile(this.path, JSON.stringify(this.products, null, 2), (err) => {
                if (err) throw new Error(err.message)
            });
            return this.products
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

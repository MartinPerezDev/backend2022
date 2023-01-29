import { constants, writeFile } from "node:fs";
import { readFile, access } from "node:fs/promises";
import { lastId } from "../utils/lastId.js";

export default class MessagesDaoFile {
    constructor() {
        this.path = "./src/data/msg.json";
        this.verifiedArchive();
        this.messages = this.get();
    }

    async verifiedArchive() {
        try {
            await access(this.path, constants.R_OK);
        } catch {
            writeFile(this.path, JSON.stringify([], null, 2), (err) => {
                !err && console.log("archivo creado!");
            });
        }
    }

    async get() {
        try {
            if (await readFile(this.path, "utf-8") !== []) {
                return this.messages = JSON.parse(await readFile(this.path, "utf-8"))
            }
            return null
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async add(msg) {
        try {
            await this.get();
            const newId = await lastId(this.messages);
            this.messages = [...this.messages, { id: newId, ...msg }];
            writeFile(this.path, JSON.stringify(this.messages, null, 2), (err) => {
                if (err) throw new Error(err.message)
            });
            return this.messages
        } catch (err) {
            throw new Error(err.message)
        }
    }

}
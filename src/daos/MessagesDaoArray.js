import { lastId } from "../utils/lastId.js";

export default class MessagesDaoArray {
    constructor() {
        this.messages = [];
    }

    async get() {
        try {
            return this.messages
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async add(msg) {
        try {
            const newId = await lastId(this.messages);
            this.messages = [...this.messages, { id: newId, ...msg }];
            return this.messages
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
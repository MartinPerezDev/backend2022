const messageSchema = require('../models/message.model')

class MessageDao {
    constructor() {
        this.schema = messageSchema
    }

    async send(email, message, type) {
        try {
            const messageBody = { email, body: message, type }
            return await this.schema(messageBody).save()
        } catch (err) {
            throw new Error('Error to send message')
        }
    }
    async getByEmail(email) {
        try {
            return await this.schema.find({ email })
        } catch (err) {
            throw new Error('Error to get message by email')
        }
    }
    async getAll(){
        try {
            return await this.schema.find()
        } catch (err) {
            throw new Error('Error to get all messages')
            
        }
    }
}

module.exports = MessageDao
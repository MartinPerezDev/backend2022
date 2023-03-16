const messageSchema = require('../models/message.model')

class MessageDao {
    constructor() {
        this.schema = messageSchema
    }
    async send(email, message, type = 'user') {
        try {
            const messageBody = { email, body: message, type }
            return await this.schema(messageBody).save()
        } catch (err) {
            throw new Error('Error to send message')
        }
    }
}

module.exports = MessageDao
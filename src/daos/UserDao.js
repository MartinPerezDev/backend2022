const userSchema = require('../models/user.model')

class UserDao {
    constructor() {
        this.schema = userSchema
    }

    async getUserByEmail(email) {
        try {
            return await this.schema.findOne({ email })
        } catch (err) {
            throw new Error('Error to get user by email')
        }
    }

    async addUser(user) {
        try {
            return await this.schema(user).save()
        } catch (err) {
            throw new Error('Error to add user')
        }
    }

    async getById(id, done) {
        try {
            const user = await this.schema.findById(id)
            done(null, user)
        } catch (err) {
            throw new Error('Error to get user by Id')
        }
    }
}

module.exports = UserDao
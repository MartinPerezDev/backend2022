export default class ContainerMongoDb {
    constructor(schema){
        this.schema = schema
    }

    async get(username){
        return await this.schema.findOne({ username: username })
    }

    async add(user){
        try {
            return await this.schema(user).save()
        } catch (error) {
            throw new Error("Error to add user");
        }
    }
    
    async getById(id, done){
        try {
            this.schema.findById(id, done)
        } catch (error) {
            throw new Error("Error to add user");
        }
    }
}
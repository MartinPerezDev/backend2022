export default class ContainerMongoDb {
    constructor(schema){
        this.schema = schema
    }

    async get(username){
        return await this.schema.findOne({ username: username }).exec()
    }

    async add(user){
        try {
            return await this.schema(user).save()
        } catch (error) {
            throw new Error("Error to add user");
        }
    }
}
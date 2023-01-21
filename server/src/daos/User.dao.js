import ContainerMongoDb from "../containers/container.mongo.db.js";
import { userSchema } from "../models/user.model.js";

class UserDao extends ContainerMongoDb {
    constructor () {
        super(userSchema)
    }
}

export const UserDaoManager = new UserDao
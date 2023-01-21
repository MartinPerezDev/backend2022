import ContainerMongoDb from "../containers/container.mongo.db.js";
import { cartSchema } from "../models/cart.model.js";

export class CartDao extends ContainerMongoDb{
    constructor(){
        super(cartSchema)
    }
}

export const CartDaoManager = new CartDao

import ContainerMongoDb from "../../containers/ContainerMongoDb.js";
import { cartsSchema } from "../../models/carts.model.js";

export class CartsDao extends ContainerMongoDb{
    constructor(){
        super(cartsSchema)
    }
}
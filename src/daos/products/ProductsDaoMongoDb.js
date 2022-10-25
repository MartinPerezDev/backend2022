import ContainerMongoDb from "../../containers/ContainerMongoDb.js";
import { productsSchema } from "../../models/products.model.js";

export class ProductsDao extends ContainerMongoDb{
    constructor(){
        super(productsSchema)
    }
}
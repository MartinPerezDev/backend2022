import ContainerMongoDb from "../containers/container.mongo.db.js";
import { productSchema } from './../models/product.model.js';

export class ProductDao extends ContainerMongoDb{
    constructor(){
        super(productSchema)
    }
}

export const ProductDaoManager = new ProductDao
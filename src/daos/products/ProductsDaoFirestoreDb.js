import ContainerFirestoreDb from "../../containers/ContainerFirestoreDb.js";
import { firestoreDbConnection } from "../../db/firestoreDb.connection.js";

export class ProductsDao extends ContainerFirestoreDb{
    constructor(){
        super(firestoreDbConnection, "products")
    }
}
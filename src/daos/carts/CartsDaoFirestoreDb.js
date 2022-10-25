import ContainerFirestoreDb from "../../containers/ContainerFirestoreDb.js";
import { firestoreDbConnection } from "../../db/firestoreDb.connection.js";

export class CartsDao extends ContainerFirestoreDb{
    constructor(){
        super(firestoreDbConnection, "carts")
    }
}
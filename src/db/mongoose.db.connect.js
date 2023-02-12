import { connect } from "mongoose";
import * as dotenv from "dotenv"

dotenv.config()

const mongoConnectDb = async()=>{
    try {
        await connect(process.env.URI_MONGO_DB)
        console.log("MongoDb connected!!")
    } catch (error) {
        console.log(error.message)
    }
}

export default mongoConnectDb
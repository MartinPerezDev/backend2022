import express from "express"
import { graphqlHTTP } from "express-graphql"

import mongoConnectDb from "./db/mongoose.db.connect.js"
import graphQlSchema from "./models/graphQl.model.js"
import { root } from "./querys/querysGraphQl.js"

const app = express()
app.listen(8080, ()=> console.log("Server up!!"))
mongoConnectDb()

app.use("/graphQl", graphqlHTTP({
    schema: graphQlSchema,
    rootValue: root,
    graphiql: true
}))

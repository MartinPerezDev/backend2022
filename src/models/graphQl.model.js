import { buildSchema } from "graphql"

const graphQlSchema = buildSchema(`
    type Product{
        id: String,
        name: String,
        description: String,
        price: Int
    }
    type Query{
        getAll: [Product]
        getById(id: String): Product
    }
    type Mutation{
        addProduct(name: String, description: String, price: Int) : Product
        setProduct(id: String, name: String, description: String, price: Int) : Product
        deleteProduct(id: String) : Product
    }
`)

export default graphQlSchema
import * as dotenv from 'dotenv'
dotenv.config()

const { CartsDao } = await import(`./carts/CartsDao${process.env.DB}.js`)
const { ProductsDao } = await import(`./products/ProductsDao${process.env.DB}.js`)

export const CartsDaoManager = new CartsDao
export const ProductsDaoManager = new ProductsDao

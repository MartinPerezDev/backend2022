import productSchema from './../models/products.model.js';
import mongoose from 'mongoose';

class ProductsDao{
    constructor(){
        this.schema =  productSchema
    }

    async getAll(){
        try {
            return await this.schema.find()
        } catch (error) {
            console.log(error.message)
        }
    }

    async getById(id){
        try {
            const idObject = mongoose.Types.ObjectId(id)
            const product = await this.schema.findById(idObject)
            return product
        } catch (error) {
            console.log(error.message)
        }
    }

    async add(product){
        try {
            let newProduct = await this.schema(product).save()
            return {...newProduct, id: newProduct._id}
        } catch (error) {
            console.log(error.message)
        }
    }

    async set(product){
        try {
            const idObject = mongoose.Types.ObjectId(product.id)
            await this.schema.findOneAndUpdate({ _id: idObject}, {...product})
            return this.getById(product.id)
        } catch (error) {
            console.log(error.message)
        }
    }

    async delete(id){
        try {
            const idObject = mongoose.Types.ObjectId(id)
            await this.schema.deleteOne({_id:idObject})
            return id
        } catch (error) {
            console.log(error.message)
        }
    }
}

const productsDaoManager = new ProductsDao

export default productsDaoManager
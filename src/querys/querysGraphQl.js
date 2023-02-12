import productsDaoManager from './../daos/ProductsDao.js';

export const root = {
    getAll : ()=> productsDaoManager.getAll(),
    getById: (id)=> productsDaoManager.getById(id),
    addProduct: (product)=> productsDaoManager.add(product),
    setProduct: (product)=> productsDaoManager.set(product),
    deleteProduct: (id)=> productsDaoManager.delete(id)
}
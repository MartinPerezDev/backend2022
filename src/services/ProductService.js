import PersistenceFactory from './../daos/persistenceFactory.js';

export default class ProductService {
    constructor() {
        this.productsDao
        this.init()
    }

    init = async () => {
        this.productsDao = await PersistenceFactory.getPersistenceProducts()
    }

    getProducts = async () => {
        return await this.productsDao.get()
    }

    addProduct = async (product) => {
        return await this.productsDao.add(product)
    }
}
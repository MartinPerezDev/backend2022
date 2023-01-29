export default class ProductDTO{
    constructor(product){
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.picture = product.thumbnail;
    }
}
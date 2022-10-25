export default class ContainerMongoDb {
  constructor(schema){
    this.schema = schema
  }

  async get() {
    try {
        return await this.schema.find()
    } catch (err) {
      throw new Error("Error to get")
    }
  }

  async addProduct(item) {
    try {
      await this.schema(item).save();
      return this.get();
    } catch (err) {
      throw new Error("Error to add product");
    }
  }

  async getById(id) {
    try {
      return await this.schema.findById(id)
    } catch (err) {
      throw new Error("Not Found by id");
    }
  }

  async deleteById(id) {
    try {
      const doc = await this.schema.findByIdAndDelete({ _id: id })
      if(!doc) throw new Error("Not Found by id")
      return this.get()
    } catch (err) {
      throw new Error("Not Found");
    }
  }

  async setById(item, id) {
    try {
      await this.schema.findOneAndUpdate({ _id: id }, item)
      return this.get()
    } catch (err) {
      throw new Error("Not Found")
    }
  }

  async addCart(){
    try {
      const item = await this.schema({ "products": [] }).save();
      return ({id: item._id});
    } catch (err) {
      throw new Error("Error to add product");
    }
  }

  async addProductInCart(id, item){
    try {
      const doc = await this.schema.findById(id);
      doc.products = [...doc.products, item];
      await doc.save();
      return this.get()
    } catch (err) {
      throw new Error("Error to add product in cart")
    }
  }

  async deleteProductInCart(id, id_prod){
    try {
      const doc = await this.schema.findById(id);
      doc.products = await doc.products.filter(res=> res._id !== id_prod)
      await doc.save()
      return this.getById(id)
    } catch (err) {
      throw new Error("Error to delete product in cart")
    }
  }

}

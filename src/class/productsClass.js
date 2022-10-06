import knex from "knex"

export class Products {
  constructor(options, tableName) {
    this.database = knex(options)
    this.table = tableName
    this.database.schema.hasTable(tableName).then( exists =>{
      if(!exists){
        this.database.schema.createTable(tableName, table => {
          table.increments('id')
          table.string('name', 20)
          table.integer('price')
          table.string('thumbnail', 200)
        })
          .then(() => console.log('Table created!'))
          .catch(err => console.log(err))
          //.finally(()=> this.database.destroy())
      }
    })
  }
  async get() {
    try {
      const products = await this.database.select().from(this.table);
        if(products.length){
          return JSON.parse(JSON.stringify(products))
        }else{
          return []
        }
    } catch (error) {
      throw Error(error.message);
    }
  }
  async addProduct(product) {
    try {
      await this.database(this.table).insert({...product})
      return await this.get()
    } catch (error) {
      throw Error(error.message);
    }
  }
}

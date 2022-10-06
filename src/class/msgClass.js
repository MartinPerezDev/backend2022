import knex from "knex";

export class Msg {
  constructor(options, tableName) {
    this.database = knex(options)
    this.table = tableName
    this.database.schema.hasTable(tableName).then( exists =>{
      if(!exists){
        this.database.schema.createTable(tableName, table => {
          table.increments('id')
          table.string('email', 20)
          table.string('fyh')
          table.string('msg', 100)
        })
          .then(() => console.log('Table created!'))
          .catch(err => console.log(err))
          //.finally(()=> this.database.destroy())
      }
    })
  }

  async getAll() {
    try {
      const products = await this.database.select("*").from(this.table);
      console.log(products)
        if(products.length){
          return JSON.parse(JSON.stringify(products))
        }else{
          return []
        }
    } catch (error) {
      throw Error(error.message);
    }
  }

  async save(product) {
    try {
      await this.database(this.table).insert(product)
      console.log(await this.getAll())
      return await this.getAll()
    } catch (error) {
      throw Error(error.message);
    }
  }
}

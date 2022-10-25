import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";

export default class ContainerFirestoreDb {
  constructor(db, collection) {
    this.db = db;
    this.collection = collection
  }
  async get() {
    try {
        const items = await getDocs(collection(this.db, this.collection))
        const result = items.docs.map(
            (doc) => (doc = { id: doc.id, ...doc.data() })
          );
        return result
    } catch (err) {
      throw new Error("Error to get");
    }
  }

  async addProduct(item) {
    try {
        await addDoc(collection(this.db, this.collection), item)
        return await this.get()
    } catch (err) {
      throw new Error("Error to add product");
    }
  }

  async getById(id) {
    try {
        const item = await getDoc(doc(this.db, this.collection, id))
        if (item.exists()) {
            return { id: item.id, ...item.data() }
          } else {
            throw new Error("Not Found by id");
          }
    } catch (err) {
      throw new Error("Not Found by id");
    }
  }

  async deleteById(id) {
    try {
        if(await this.getById(id)){
            await deleteDoc(doc(this.db, this.collection, id));
            return await this.get();
        }else{
            throw new Error("Not Found by id");
        }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async setById(item, id) {
    try {
        await updateDoc(doc(this.db, this.collection, id), item);
        return await this.get();
    } catch (err) {
      throw new Error("Not Found");
    }
  }

  async addCart() {
    try {
        const dateNow = new Date() 
        await addDoc(collection(this.db, this.collection), { "products": [], "timestamp": dateNow.toLocaleString() })
        return await this.get()
    } catch (err) {
      throw new Error("error to add cart");
    }
  }

  async addProductInCart(id, item) {
    try {
        const items = await this.getById(id)
        const ref = await updateDoc(doc(this.db, this.collection, id), {
            products: [...items.products, item]
        })
        return await this.get();
    } catch (err) {
      throw new Error("error to add product in cart");
    }
  }

  async deleteProductInCart(id, id_prod) {
    try {
        const items = await this.getById(id)
        const newItems = items.products.filter( res=> res._id != id_prod)
        const ref = await updateDoc(doc(this.db, this.collection, id), {
            products: newItems
        })
        return await this.get();
    } catch (err) {
      throw new Error("Error to delete product in cart");
    }
  }
}

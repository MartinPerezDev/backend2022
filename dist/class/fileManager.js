"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileManager = void 0;

var _nodeFs = require("node:fs");

var _promises = require("node:fs/promises");

var _moment = _interopRequireDefault(require("moment/moment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FileManager {
  constructor(path) {
    this.path = path;
  }

  async verifiedArchive() {
    try {
      await (0, _promises.access)(this.path, _nodeFs.constants.R_OK);
    } catch {
      (0, _nodeFs.writeFile)(this.path, JSON.stringify([], null, 2), err => {
        if (!err) return true;
      });
    }
  }

  async lastId() {
    try {
      if (this.items.length === 0) {
        return 1;
      }

      let newId = this.items[this.items.length - 1];
      return newId.id + 1;
    } catch (err) {
      throw err.message;
    }
  }

  async itemExist(id) {
    const exist = this.items.some(res => res.id === parseInt(id));
    return exist;
  }

  async get() {
    try {
      if ((await (0, _promises.readFile)(this.path, "utf-8")) !== []) {
        return this.items = JSON.parse(await (0, _promises.readFile)(this.path, "utf-8"));
      }
    } catch (err) {
      throw err.message;
    }
  }

  async addProduct(item) {
    try {
      await this.get();
      const newId = await this.lastId(this.items);
      item = {
        id: newId,
        ...item,
        timestamp: (0, _moment.default)().format("DD/MM/YYYY HH:mm")
      };
      this.items = [...this.items, item];
      (0, _nodeFs.writeFile)(this.path, JSON.stringify(this.items, null, 2), err => {
        return this.items;
      });
    } catch (err) {
      throw new Error("Error to save");
    }
  }

  async addCart() {
    try {
      await this.get();
      const newId = await this.lastId(this.items);
      const item = {
        id: newId,
        timestamp: (0, _moment.default)().format("DD/MM/YYYY HH:mm"),
        products: []
      };
      this.items = [...this.items, item];
      (0, _nodeFs.writeFile)(this.path, JSON.stringify(this.items, null, 2), async err => {
        await this.get();
      });
      return {
        id: newId
      };
    } catch (err) {
      throw new Error("Error to add Item");
    }
  }

  async addProductInCart(id, item) {
    try {
      await this.get();
      this.items.map(res => {
        if (res.id === parseInt(id)) {
          res.products.push(item);
        }
      });
      (0, _nodeFs.writeFile)(this.path, JSON.stringify(this.items, null, 2), async err => {
        await this.get();
      });
      const items = this.items.find(res => res.id === parseInt(id));
      return items.products;
    } catch (err) {
      throw new Error("Error to add Item");
    }
  }

  async deleteProductInCart(id, id_prod) {
    try {
      let items = [];
      let i = 0;
      await this.get();
      this.items.map(res => {
        if (res.id === parseInt(id)) {
          if (!this.items[i].products.some(res => res.id === parseInt(id_prod))) {
            throw new Error("Error to delete Item");
          } else {
            items = this.items[i].products.filter(res => res.id !== parseInt(id_prod));
            this.items[i].products = items;
            i = i + 1;
          }
        }
      });
      (0, _nodeFs.writeFile)(this.path, JSON.stringify(this.items, null, 2), async err => {
        await this.get();
      });
      return items;
    } catch (err) {
      throw new Error("Error to delete Item");
    }
  }

  async set(item, id) {
    try {
      await this.get();
      await this.items.map(res => {
        if (res.id == parseInt(id)) {
          res.timestamp = (0, _moment.default)().format("DD/MM/YYYY HH:mm"), res.name = item.name || res.name, res.description = item.description || res.description, res.code = item.code || res.code, res.image = item.image || res.image, res.price = item.price || res.price, res.stock = item.stock || res.stock;
        }
      });
      (0, _nodeFs.writeFile)(this.path, JSON.stringify(this.items, null, 2), async err => {
        await this.get();
      });
      return this.items;
    } catch (err) {
      throw new Error("Error to save");
    }
  }

  async getById(id) {
    try {
      await this.get();

      if (await this.itemExist(id)) {
        return this.items.find(res => res.id === parseInt(id));
      } else {
        throw new Error("Not Found");
      }
    } catch (err) {
      throw new Error("Not Found");
    }
  }

  async deleteById(id) {
    try {
      let i = 0;
      await this.get();

      for (const item of this.items) {
        if (item.id === parseInt(id)) {
          this.items.splice(i, 1);
          (0, _nodeFs.writeFile)(this.path, JSON.stringify(this.items, null, 2), async err => {
            await this.get();
          });
          return this.items;
        }

        i = i + 1;
      }

      throw new Error("Not Found");
    } catch (err) {
      throw new Error("Not Found");
    }
  }

  async deleteAll() {
    try {
      (0, _nodeFs.writeFile)(this.path, JSON.stringify([], null, 2), err => {
        if (!err) return true;
      });
    } catch (err) {
      throw err.message;
    }
  }

}

exports.FileManager = FileManager;
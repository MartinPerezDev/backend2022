import { constants, writeFile } from "node:fs";
import { readFile, access } from "node:fs/promises";

export class Messages {
  constructor(path) {
    this.path = path;
    this.data = this.getAll();
  }

  async verifiedArchive() {
    try {
      await access(this.path, constants.R_OK);
    } catch {
      writeFile(this.path, JSON.stringify([], null, 2), (err) => {
        !err && console.log("archivo creado!");
      });
    }
  }

  async lastId() {
    try {
      if (this.data.length === 0) {
        return 1;
      }
      let newId = this.data[this.data.length - 1];
      return newId.id + 1;
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async getAll() {
    try {
      if (await readFile(this.path, "utf-8") !== []) {
        return this.data = JSON.parse(await readFile(this.path, "utf-8"))
      }
      return null
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async save(data) {
    try {
      await this.getAll();
      const newId = await this.lastId();
      this.data = [...this.data, { id: newId, ...data }];
      writeFile(this.path, JSON.stringify(this.data, null, 2), (err) => {
        if (err) throw new Error(err.message)
      });
      return this.data
    } catch (err) {
      throw new Error(err.message)
    }
  }

}

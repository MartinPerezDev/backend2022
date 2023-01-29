import * as dotenv from "dotenv"

dotenv.config()

export default class PersistenceFactory {
    static getPersistenceMessages = async () => {
        switch (process.env.PERSISTENCE) {
            case "ARRAY":
                let { default: MessagesDaoArray } = await import('./MessagesDaoArray.js')
                return new MessagesDaoArray()
            case "FILE":
                let { default: MessagesDaoFile } = await import('./MessagesDaoFile.js')
                return new MessagesDaoFile()
        }
    }

    static getPersistenceProducts = async () => {
        switch (process.env.PERSISTENCE) {
            case "ARRAY":
                let { default: ProductsDaoArray } = await import('./ProductsDaoArray.js')
                // let UsersDaoArray = await import('./userDaoArray.js')
                return new ProductsDaoArray()
            case "FILE":
                let { default: ProductsDaoFile } = await import('./ProductsDaoFile.js')
                return new ProductsDaoFile()
        }
    }
}
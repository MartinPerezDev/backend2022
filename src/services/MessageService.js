import PersistenceFactory from './../daos/persistenceFactory.js';

export default class MessageService {
    constructor() {
        this.messagesDao
        this.init()
    }

    init = async () => {
        this.messagesDao = await PersistenceFactory.getPersistenceMessages()
    }

    getMessages = async () => {
        return await this.messagesDao.get()
    }

    addMessage = async (message) => {
        return await this.messagesDao.add(message)
    }
}
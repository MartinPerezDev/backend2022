const { Server } = require("socket.io")
const MessageDao = require("../daos/MessageDao.js")

const messageDao = new MessageDao()

const socketIo = (server) => {
    const io = new Server(server)
    io.on("connection", async (socket) => {
        const messages = await messageDao.getAll()
        socket.emit('historyChat', messages)

        socket.on("addMsg", async ({ email, message }) => {
            await messageDao.send(email, message, type = 'user')
            const messages = await messageDao.getAll()
            io.emit("historyChat", messages)
        })
    });
}

module.exports = socketIo
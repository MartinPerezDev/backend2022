const { Server } = require('socket.io')
const { server } = require('../App.js')

const io = new Server(server)

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected...`);

    socket.emit("historyProducts", products);
    socket.on("addProduct", (data) => {
        io.emit("historyProducts", data);
    });

    msgManager.getAll().then((msg) => socket.emit("historyChat", msg))
    socket.on("addMsg", data => {
        io.emit("historyChat", data)
    })
});
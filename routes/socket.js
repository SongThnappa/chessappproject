const io = require("socket.io")(3001);

io.on("connection", socket => {

    socket.emit("main-chat", "You joined the chat...");
    

    socket.on("send-message", message =>{
        socket.broadcast.emit("main-chat", message)
    });
   
})
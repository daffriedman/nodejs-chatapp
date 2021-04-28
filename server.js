const io = require("socket.io")(5020);
const users = {};
io.on("connection", (socket) => {
  // socket.emit('chat-message', 'Hello world!!')
  socket.on("new-user", (userName) => {
    users[socket.id] = userName;
    socket.broadcast.emit("user-connected", userName);
  });
  socket.on("send-chat-message", (message) => {
    // console.log(message);
    socket.broadcast.emit("chat-message", {
      message: message,
      userName: users[socket.id],
    });
  });
  socket.on('disconnect', ()=> {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
  delete users[socket.id]
  })
});

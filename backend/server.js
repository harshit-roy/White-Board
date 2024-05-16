const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const {Server} = require('socket.io');
const {addUser, getUser} = require('./utils/users');
const io = new Server(server);
//routes

app.get('/', (req, res) => {
  res.send('This is the BackEnd of the Project');
});

let roomIdGlobal, imgURLGlobal;

io.on('connection', socket => {
  socket.on('userJoined', data => {
    const {name, userId, roomId, host, presenter} = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser({
      name,
      userId,
      roomId,
      host,
      presenter,
      socketId: socket.id,
    });

    socket.emit('userIsJoined', {success: true, users});
    socket.broadcast.to(roomId).emit('userJoinedMessageBroadcasted', name);
    socket.broadcast.to(roomId).emit('allUsers', users);
    socket.broadcast
      .to(roomId)
      .emit('whiteboardDataResponce', {imgURL: imgURLGlobal});
  });
  socket.on('whiteboardData', data => {
    imgURLGlobal = data;
    socket.broadcast
      .to(roomIdGlobal)
      .emit('whiteboardDataResponce', {imgURL: data});
  });
});

const port = process.env.PORT || 5000;

//cors
const corsOpt = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOpt));

server.listen(port, () => console.log(`Server is running on ${port}`));

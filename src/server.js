import http from 'http';
import socketIO from 'socket.io';
import app from './app';

import sendMessage from './socket';

const server = http.createServer(app);

server.listen(process.env.PORT || 3333);

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`New client connected ${socket.id}`);
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('sendMessage', (data) => {
    sendMessage(socket, data);
  });
});
io.listen(8080);

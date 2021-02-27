import http from 'http';
import socketIO from 'socket.io';
import app from './app';

import getChats from './socket';

const server = http.createServer(app);

server.listen(process.env.PORT || 3333);

const io = socketIO(server);

const clients = [];

io.on('connection', (socket) => {
  console.log(`New client connected ${socket.id}`);

  getChats(socket, { user_id: '43523fc6-3bfc-4988-9318-9b8c83f45e39' });
  // socket.on('clientInfo', (data) => {
  //   const clientInfo = { user_id: data.id, client_id: socket.id };

  //   clients.push(clientInfo);

  //   getChats(socket, clientInfo);
  // });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

io.listen(8080);

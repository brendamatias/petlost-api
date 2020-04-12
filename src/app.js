import 'dotenv/config';

import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import routes from './routes';

import sendMessage from './socket';

import './database';

class App {
  constructor() {
    this.server = express();

    this.socket();
    this.middlewares();
    this.routes();
  }

  socket() {
    const server = http.createServer(this.server);
    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log(`New client connected ${socket.id}`);
      socket.on('disconnect', () => console.log('Client disconnected'));
      socket.on('sendMessage', (data) => {
        sendMessage(socket, data);
      });
    });
    io.listen(8080);
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

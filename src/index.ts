import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { port } from './utils/env.util';
import { AppDataSource } from './config/data-source';
import router from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app: Application = express();
const server = createServer(app);
const io = new Server(server);

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());
    app.use(cors());

    
    app.use('/api', router);

    // Socket.IO setup
    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      // Handle room-related events
      require('./sockets/roomSocket')(socket);

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

   
    app.use(errorHandler);

    console.log('=== uwu ===');
    console.log('DATABASE CONNECTION ESTABLISHED!');
    console.log('=== uwu ===');

    server.listen(port, (): void => {
      console.log(`Listening on ${port}`);
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  });

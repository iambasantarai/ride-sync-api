import { Server } from 'socket.io';
import http from 'http';

export const initSockets = (server: http.Server): Server => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Handle room-related events
    require('./roomSocket')(socket);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

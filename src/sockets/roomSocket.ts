import { Socket } from 'socket.io';
import { Room } from '../entities/room.entity';

const handleRoomEvents = (socket: Socket) => {
  socket.on('joinRoom', async (roomId: string) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    // Save room to the database
    try {
      const room = await Room.createRoom(roomId);
      console.log(`Room ${room.name} saved to the database`);
    } catch (error: any) {  
      console.error('Error creating room:', error.message);
    }
  });

  socket.on('leaveRoom', (roomId: string) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });

  
};

module.exports = handleRoomEvents;

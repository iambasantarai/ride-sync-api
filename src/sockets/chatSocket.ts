import { Socket, Server } from 'socket.io';
import { saveMessageToDatabase } from '../services/message.service';

export const setupChatSocket = (socket: Socket, io: Server): void => {
  // Handle chat-related events
  socket.on('chat message', async ({ message, roomId }) => {
    try {
      // Log the received message and roomId on the server
      console.log('Received message:', message, 'from room:', roomId);

      // Save the message to the database with the corresponding roomId
      const savedMessage = await saveMessageToDatabase(message, roomId);

      // Broadcast the saved message back to the sender (the frontend)
      socket.emit('chat message', savedMessage);

      // Broadcast the message to everyone in the room (including the sender if needed)
      console.log('Broadcasted message:', savedMessage);
      io.to(roomId).emit('chat message', savedMessage);
    } catch (error) {
      console.error('Error handling chat message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};

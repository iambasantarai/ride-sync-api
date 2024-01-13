import { Socket, Server } from 'socket.io';
import { saveMessageToDatabase } from '../services/message.service'; // Replace with the actual path

export const setupChatSocket = (socket: Socket, io: Server): void => {
  // Handle chat-related events
  socket.on('chat message', async (message: string) => {
    try {
      // Log the received message on the server
      console.log('Received message ', message);

      // Save the message to the database
      const savedMessage = await saveMessageToDatabase(socket.id, message);

      // Broadcast the saved message back to the sender (the frontend)
      socket.emit('chat message', savedMessage);

      // Broadcast the message to everyone in the room (including the sender if needed)
      console.log('Broadcasted message', savedMessage);
      io.emit('chat message', savedMessage);
    } catch (error) {
      console.error('Error handling chat message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};

import { Socket, Server } from 'socket.io';

export const setupChatSocket = (socket: Socket, io: Server): void => {
  // Handle chat-related events
  socket.on('chat message', (message: string) => {
    // Log the received message on the server
    console.log('Received message ', message);

    // Broadcast the received message back to the sender (the frontend)
    socket.emit('chat message', message);
    // Broadcast the message to everyone in the room (including the sender if needed)
    console.log('boardcasted message', message);
    io.emit('chat message', message);
  });

  //send
  // const sendBackendMessageToFrontend = () => {
  //   const backendMessage = 'Message from the backend!';

  //   // Broadcast the backend message to all connected clients
  //   io.emit('chat message', backendMessage);

  //   // Log the sent backend message on the server
  //   console.log('Sent message from the backend:', backendMessage);
  // };

  // Call the function when needed, for example, on a certain event or interval
  // sendBackendMessageToFrontend();
  // sendBackendMessageToFrontend();
  // sendBackendMessageToFrontend();
  // sendBackendMessageToFrontend();
  // sendBackendMessageToFrontend();
  // sendBackendMessageToFrontend();

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};

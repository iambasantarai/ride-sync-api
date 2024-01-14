import { Message } from '../entities/messages.entity';

export const saveMessageToDatabase = async (text: string, roomId: string) => {
  const message = Message.create({ text, roomId });

  // Save the message to the database using TypeORM
  await message.save();

  return message;
};

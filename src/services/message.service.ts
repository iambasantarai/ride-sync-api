// message.service.ts

import { Message } from '../entities/messages.entity';

export const saveMessageToDatabase = async (sender: string, text: string) => {
  const conversation = Message.save({ sender, text });
  return conversation;
};

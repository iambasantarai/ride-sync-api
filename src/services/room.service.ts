import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

export class RoomService {
  static async getRooms(user: User) {
    const rooms = await Room.find({
      where: {
        creator: { id: user.id },
      },
      relations: ['creator', 'participants'],
    });

    return rooms;
  }

  static async create(user: User, name: string) {
    const existingRoom = await Room.findOne({
      where: { name },
    });

    if (existingRoom) {
      throw new Error('Room already exists.');
    }

    const newRoom = await Room.save({
      creator: user,
      name,
    });

    return newRoom;
  }

  static async add(roomId: string, user: User) {
    const room = await Room.findOne({
      where: { id: roomId },
      relations: ['participants'],
    });

    if (!room) {
      throw new Error('Room not found.');
    }

    room.participants = room.participants || [];

    const isUserInRoom = room.participants.some(
      (participant) => participant.id === user.id,
    );

    if (!isUserInRoom) {
      room.participants.push(user);
      await Room.save(room);
    }

    return room;
  }

  static async leave(roomId: string, user: User) {
    const room = await Room.findOne({
      where: { id: roomId },
      relations: ['participants'],
    });

    if (!room) {
      throw new Error('Room not found.');
    }

    room.participants = room?.participants?.filter(
      (participant) => participant.id !== user.id,
    );

    await Room.save(room);

    return room;
  }

  static async delete(roomId: string) {
    const room = await Room.findOne({
      where: { id: roomId },
    });

    if (!room) {
      throw new Error('Room not found.');
    }

    await Room.delete({ id: room.id });
  }
}

import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

export class RoomService {
  static async getRooms(user: User) {
    const rooms = await Room.find({
      where: {
        creator: { id: user.id },
      },
    });

    return rooms;
  }

  static async createRoom(user: User, name: string) {
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
}

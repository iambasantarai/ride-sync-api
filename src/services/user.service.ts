import { ILike } from 'typeorm';
import { User } from '../entities/user.entity';

export class UserService {
  static async findUserByName(username: string) {
    const user = await User.find({
      where: {
        username: ILike(`%${username}%`),
      },
    });

    return user;
  }
}

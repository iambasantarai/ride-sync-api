import { NextFunction, Response } from 'express';
import { IRequestWithUser } from '../types/user';
import { AppError } from '../helpers/error.helper';
import { RoomService } from '../services/room.service';
import { User } from '../entities/user.entity';

export class RoomController {
  static async rooms(req: IRequestWithUser, res: Response, next: NextFunction) {
    const user = req.user;
    try {
      const rooms = await RoomService.getRooms(user as User);

      res.status(200).json({ rooms });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }

  static async createRoom(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction,
  ) {
    const user = req.user;
    const name = req.body.name;

    try {
      const room = await RoomService.createRoom(user as User, name);

      res.status(200).json({ room });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }
}

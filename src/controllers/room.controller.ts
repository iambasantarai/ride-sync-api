import { NextFunction, Request, Response } from 'express';
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
      const room = await RoomService.create(user as User, name);

      res.status(200).json({ room, message: 'Room created successfully.' });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }

  static async joinRoom(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction,
  ) {
    const user = req.user;
    const roomId = req.params.roomId;

    try {
      const room = await RoomService.join(roomId, user as User);

      res.status(200).json({ message: 'Successfully joined the room.', room });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }

  static async leaveRoom(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction,
  ) {
    const user = req.user;
    const roomId = req.params.roomId;

    try {
      const room = await RoomService.leave(roomId, user as User);

      res.status(200).json({ message: 'Successfully left the room.', room });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }

  static async deleteRoom(req: Request, res: Response, next: NextFunction) {
    const roomId = req.params.roomId;

    try {
      await RoomService.delete(roomId);

      res.status(200).json({ message: 'Room deleted successfully.' });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }
}

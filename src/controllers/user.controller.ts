import { NextFunction, Request, Response } from 'express';
import { IRequestWithUser } from '../types/user';
import { UserService } from '../services/user.service';
import { AppError } from '../helpers/error.helper';

export class UserController {
  static async profile(req: IRequestWithUser, res: Response) {
    const user = req.user;
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return res.status(200).json({ user: userWithoutPassword });
  }

  static async getUserByName(req: Request, res: Response, next: NextFunction) {
    const { username } = req.query;

    try {
      const user = await UserService.findUserByName(username as string);

      return res.status(200).json({ user });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }
}

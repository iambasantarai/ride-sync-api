import { Response } from 'express';
import { IRequestWithUser } from '../types/user';

export class UserController {
  static async profile(req: IRequestWithUser, res: Response) {
    const user = req.user;
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return res.status(200).json({ user: userWithoutPassword });
  }
}

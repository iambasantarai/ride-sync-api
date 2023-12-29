import { Request, Response } from 'express';
import { IRequestWithUser } from '../types/user';
import { UserService } from '../services/user.service';

export class UserController {
  static async profile(req: IRequestWithUser, res: Response) {
    const user = req.user;
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return res.status(200).json({ user: userWithoutPassword });
  }

  static async getUserByName(req: Request, res: Response) {
    const { username } = req.query;

    try {
      const user = await UserService.findUserByName(username as string);

      return res.status(200).json({user});
    } catch (error: any) {
      console.log('ERROR: ', error);
      res.status(500).json({ message: error.message });
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AppError } from '../helpers/error.helper';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { username, email, phone, password } = req.body;

    try {
      const token = await AuthService.registerUser(
        username,
        email,
        phone,
        password,
      );
      res.status(201).json({ token });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const token = await AuthService.loginUser(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      console.log('ERROR: ', error);
      next(new AppError(error.code, error.message));
    }
  }
}

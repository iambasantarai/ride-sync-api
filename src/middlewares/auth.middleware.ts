import { Response, NextFunction } from 'express';
import { User } from '../entities/user.entity';
import { IRequestWithUser } from '../types/user';
import { TokenManager } from '../helpers/jwt.helper';

export const authMiddleware = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Missing authentication token.',
    });
  }

  try {
    const decodedUser = await TokenManager.verifyToken(token);
    const userId = decodedUser.userId;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized access.',
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
};

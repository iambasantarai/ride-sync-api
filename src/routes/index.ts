import { Request, Response, Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import friendshipRoutes from './friendship.routes';
import roomRoutes from './room.routes';

const router = Router();

router.get('/foo', (_req: Request, res: Response) =>
  res.status(200).json({ foo: 'bar' }),
);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/friends', friendshipRoutes);
router.use('/rooms', roomRoutes);

export default router;

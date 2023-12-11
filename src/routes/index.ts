import { Request, Response, Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.get('/foo', (_req: Request, res: Response) =>
  res.status(200).json({ foo: 'bar' }),
);

router.use('/auth', authRoutes);

export default router;

import { Request, Response, Router } from 'express';

const router = Router();

router.get('/foo', (_req: Request, res: Response) =>
  res.status(200).json({ foo: 'bar' }),
);

export default router;

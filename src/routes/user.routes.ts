import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.get('/profile', authMiddleware, UserController.profile);

router.get('/', authMiddleware, UserController.getUserByName);

export default router;

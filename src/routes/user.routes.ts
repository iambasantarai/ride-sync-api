import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserController } from '../controllers/user.controller';

const router = Router();

// ensure authenticated
router.use(authMiddleware);

router.get('/profile', UserController.profile);

export default router;

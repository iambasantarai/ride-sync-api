import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, RoomController.rooms);
router.post('/', authMiddleware, RoomController.createRoom);

export default router;

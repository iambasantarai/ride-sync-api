import { Router } from 'express';
import { RoomController } from '../controllers/room.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, RoomController.rooms);
router.post('/', authMiddleware, RoomController.createRoom);
router.post('/:roomId/add', authMiddleware, RoomController.addToRoom);
router.post('/:roomId/leave', authMiddleware, RoomController.leaveRoom);
router.delete('/:roomId', authMiddleware, RoomController.deleteRoom);
export default router;

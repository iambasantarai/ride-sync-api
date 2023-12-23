import { Router } from 'express';
import { FriendshipController } from '../controllers/friendship.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, FriendshipController.friends);

router.post(
  '/add/:userId',
  authMiddleware,
  FriendshipController.sendFriendRequest,
);

router.patch(
  '/accept/:requestId',
  authMiddleware,
  FriendshipController.acceptFriendRequest,
);

router.patch(
  '/decline/:requestId',
  authMiddleware,
  FriendshipController.declineFriendRequest,
);

export default router;

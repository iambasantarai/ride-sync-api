import { Request, Response } from 'express';
import { IRequestWithUser } from '../types/user';
import { FriendshipService } from '../services/friendship.service';
import { User } from '../entities/user.entity';

export class FriendshipController {
  static async friends(req: IRequestWithUser, res: Response) {
    const user = req.user;
    const friends = await FriendshipService.getFriends(user as User);

    res.status(200).json({ friends });
  }

  static async requests(req: IRequestWithUser, res: Response) {
    const user = req.user;
    try {
      const requests = await FriendshipService.getRequests(user as User);

      res.status(200).json({ requests });
    } catch (error: any) {
      console.log('ERROR: ', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async sendFriendRequest(req: IRequestWithUser, res: Response) {
    const sender = req.user;
    const receiverId = req.params.userId;

    const receiver = await User.findOne({ where: { id: receiverId } });

    try {
      const request = await FriendshipService.sendFriendRequest(
        sender as User,
        receiver as User,
      );

      res.status(200).json({
        message: 'Friend request has been sent successfully.',
        request,
      });
    } catch (error: any) {
      console.log('ERROR: ', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async acceptFriendRequest(req: IRequestWithUser, res: Response) {
    const user = req.user;
    const requestId = req.params.requestId;

    try {
      await FriendshipService.acceptFriendRequest(user as User, requestId);

      res.status(200).json({
        message: 'Friend request has been accepted successfully.',
      });
    } catch (error: any) {
      console.log('ERROR: ', error);
      res.status(500).json({ message: error.message });
    }
  }

  static async declineFriendRequest(req: IRequestWithUser, res: Response) {
    const user = req.user;
    const requestId = req.params.requestId;

    try {
      await FriendshipService.declineFriendRequest(user as User, requestId);

      res.status(200).json({
        message: 'Friend request has been declined successfully.',
      });
    } catch (error: any) {
      console.log('ERROR: ', error);
      res.status(500).json({ message: error.message });
    }
  }
}

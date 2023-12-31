import { Friendship, FriendshipStatus } from '../entities/friendship.entity';
import { User } from '../entities/user.entity';

export class FriendshipService {
  static async getFriends(user: User) {
    const friendships = await Friendship.find({
      where: [
        {
          sender: { id: user.id },
          status: FriendshipStatus.ACCEPTED,
        },
        {
          receiver: { id: user.id },
          status: FriendshipStatus.ACCEPTED,
        },
      ],
      relations: ['sender', 'receiver'],
    });

    const friends = friendships.flatMap((friendship) => {
      const sender = friendship.sender ? friendship.sender : null;
      const receiver = friendship.receiver ? friendship.receiver : null;

      return [sender, receiver];
    });

    const uniqueFriends = friends.filter(
      (friend) => friend && friend.id !== user.id,
    );

    return uniqueFriends;
  }

  static async getRequests(receiver: User) {
    const requests = await Friendship.find({
      where: {
        status: FriendshipStatus.PENDING,
        receiver: { id: receiver.id },
      },
      relations: ['sender'],
    });

    return requests;
  }

  static async sendFriendRequest(sender: User, receiver: User) {
    if (sender.id === receiver.id) {
      throw new Error('Not possible to add yourself.');
    }

    const existingRequest = await Friendship.findOne({
      where: {
        sender: { id: sender.id },
        receiver: { id: receiver.id },
      },
    });

    if (existingRequest) {
      throw new Error('Friend request already sent.');
    }

    const newRequest = await Friendship.save({
      sender,
      receiver,
      status: FriendshipStatus.PENDING,
    });

    return newRequest;
  }

  static async acceptFriendRequest(user: User, requestId: string) {
    const request = await Friendship.findOne({
      where: { id: requestId },
      relations: ['sender', 'receiver'],
    });

    if (!request) {
      throw new Error('Friend request not found.');
    }

    if (user.id === request.sender.id || user.id !== request.receiver.id) {
      throw new Error('You are not authorized to perform this action.');
    }

    request.status = FriendshipStatus.ACCEPTED;

    await Friendship.save(request);
  }

  static async declineFriendRequest(user: User, requestId: string) {
    const request = await Friendship.findOne({
      where: { id: requestId },
      relations: ['sender', 'receiver'],
    });

    if (!request) {
      throw new Error('Friend request not found.');
    }

    if (user.id === request.sender.id || user.id !== request.receiver.id) {
      throw new Error('You are not authorized to perform this action.');
    }
    request.status = FriendshipStatus.DECLINED;

    await Friendship.save(request);
  }
}

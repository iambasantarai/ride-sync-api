import { Column, Entity, ManyToOne } from 'typeorm';
import ModelEntity from './model.entity';
import { User } from './user.entity';

export enum FriendshipStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

@Entity({
  name: 'friendship',
})
export class Friendship extends ModelEntity {
  @ManyToOne(() => User, (user) => user.sentFriendRequests)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedFriendRequests)
  receiver: User;

  @Column({
    type: 'enum',
    enum: FriendshipStatus,
    default: FriendshipStatus.PENDING,
  })
  status: FriendshipStatus;
}

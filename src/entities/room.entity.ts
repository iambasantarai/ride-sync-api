import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import ModelEntity from './model.entity';
import { User } from './user.entity';

@Entity({
  name: 'room',
})
export class Room extends ModelEntity {
  @Column()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];
}

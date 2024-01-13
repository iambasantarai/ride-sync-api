// message.entity.ts
import ModelEntity from './model.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Message extends ModelEntity {
  @Column()
  sender: string;

  @Column('text')
  text: string;
}

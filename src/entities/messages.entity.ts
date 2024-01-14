import ModelEntity from './model.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Message extends ModelEntity {
  // @Column()
  // sender: string;

  @Column('text')
  text: string;

  @Column()
  roomId: string; // Assuming roomId is of type string, you can adjust the type accordingly
}

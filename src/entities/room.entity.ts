import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  

  static createRoom(name: string): Promise<Room> {
    const room = this.create({ name });
    return room.save();
  }
}

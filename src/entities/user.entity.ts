import { Column, Entity } from 'typeorm';
import ModelEntity from './model.entity';

@Entity({
  name: 'user',
})
export class User extends ModelEntity {
  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'text',
  })
  password: string;
}

import dotenv from 'dotenv';
import { dirname } from 'path';
import { db } from '../utils/env.util';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
  database: db.database,
  synchronize: true,
  logging: false,
  entities: [dirname(__dirname) + '/entities/**/*.entity{.ts,.js}'],
  migrations: [dirname(__dirname) + '/migrations/**/*.ts'],
});

import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 8000;

export const db = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { port } from './utils/env.util';
import { AppDataSource } from './config/data-source';
import router from './routes';

const app: Application = express();

AppDataSource.initialize()
  .then(() => {
    app.use(express.json());
    app.use(cors());

    app.use('/api', router);

    console.log('=== uwu ===');
    console.log('DATABASE CONNECTION ESTABLISHED!');
    console.log('=== uwu ===');

    app.listen(port, (): void => {
      console.log(`Listening on ${port}`);
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('ERROR: ', error);
  });

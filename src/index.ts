import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

import router from './routes';

const PORT = process.env.PORT || 8000;

app.use('/api', router);

app.listen(PORT, (): void => {
  console.log(`Listening on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

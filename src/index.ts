import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 8000;

app.get('/foo', (_req: Request, res: Response) => {
  res.send({ foo: 'bar' });
});

app.listen(PORT, (): void => {
  console.log(`Listening on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

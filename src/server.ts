import express, { Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";

import cors from 'cors'

import routes from './routes'

export const prisma = new PrismaClient();

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/fleet', routes)

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('server is running on port 3333');
});
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaUserRepository } from './repository/PrismaUserRepository';
import { prisma } from './infra/prisma';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const UserRepository = new PrismaUserRepository(prisma);
app.get('/', (req: Request, res: Response) => {
  UserRepository.create({
    id: "12232",
    email: "te2s2te2@gmail.cm",
    name: "teste",
    age: new Date(2025,11,30),
    password : "abluble",
    verfifiedAccount: true
  })
  res.send('Hello from Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
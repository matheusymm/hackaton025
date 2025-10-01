import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaUserRepository } from './repository/PrismaUserRepository';
import { prisma } from './infra/prisma';
import { CreateUserController } from './http/controllers/user/CreateUserController';
import { UserServicesImpl } from './services/UserServicesImpl';
import { adaptExpressController } from './http/adapters/expressControllerAdapter';
import { ErrorHandler } from './http/middlewares/errorHandler';
import { adaptExpressErrorHandler } from './http/adapters/expressErrorAdapter';
import { GetVideosController } from './http/controllers/youtube/GetVideoController';

dotenv.config();

const app: Express = express();
app.use(express.json());


const port = process.env.PORT || 3000;
const UserRepository = new PrismaUserRepository(prisma);
const userService = new UserServicesImpl(UserRepository);
const createUserController = new CreateUserController(userService);
const getvideos = new GetVideosController()
app.post('/user', adaptExpressController(createUserController));
app.post('/search', adaptExpressController(getvideos))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

app.use(adaptExpressErrorHandler(new ErrorHandler()))
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
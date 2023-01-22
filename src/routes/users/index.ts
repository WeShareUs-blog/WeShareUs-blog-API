import * as Router from 'koa-joi-router';
import { loginRoutes } from './login';

export const usersRouter = Router();

usersRouter.prefix('/users');
usersRouter.route([...loginRoutes]);

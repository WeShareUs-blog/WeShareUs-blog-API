import * as Router from 'koa-joi-router';
import { loginRoutes } from './login';
import { signupRoutes } from './signup';

export const usersRouter = Router();

usersRouter.prefix('/users');
usersRouter.route([...loginRoutes, ...signupRoutes]);

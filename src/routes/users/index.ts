import * as Router from 'koa-joi-router';
import { loginRoutes } from './login';
import { signupRoutes } from './signup';
import { authHandler, jwtValidateHandler } from '../../middlewares/auth-handler';
import { todosRoutes } from './todos';

export const publicUsersRouter = Router();
export const privateUsersRouter = Router();

publicUsersRouter.prefix('/users');
publicUsersRouter.route([...loginRoutes, ...signupRoutes]);

privateUsersRouter.prefix('/users').use(jwtValidateHandler, authHandler);
privateUsersRouter.route([...todosRoutes]);

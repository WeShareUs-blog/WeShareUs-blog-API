import * as Router from 'koa-joi-router';
import { todosRoutes } from './todos';
import { authHandler, jwtValidateHandler } from '../../middlewares/auth-handler';

export const adminsRouter = Router();

adminsRouter.prefix('/admins').use(jwtValidateHandler, authHandler);
adminsRouter.route([...todosRoutes]);

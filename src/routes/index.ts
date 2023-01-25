import * as Router from 'koa-joi-router';
import { usersRouter } from './users';
import { adminsRouter } from './admins';
import { todosRouter } from './todos';

export const globalRouter = Router();

globalRouter.get('/ping', (ctx) => {
  ctx.body = { data: 'pong' };
});

globalRouter.use(usersRouter.middleware());
globalRouter.use(adminsRouter.middleware());
globalRouter.use(todosRouter.middleware());

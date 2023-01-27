import * as Router from 'koa-joi-router';
import { usersRouter } from './users';

export const globalRouter = Router();

globalRouter.get('/ping', (ctx) => {
  ctx.body = { data: 'pong' };
});

globalRouter.use(usersRouter.middleware());

import * as Router from 'koa-joi-router';
import { privateUsersRouter, publicUsersRouter } from './users';

export const globalRouter = Router();

globalRouter.get('/ping', (ctx) => {
  ctx.body = { data: 'pong' };
});

globalRouter.use(publicUsersRouter.middleware());
globalRouter.use(privateUsersRouter.middleware());

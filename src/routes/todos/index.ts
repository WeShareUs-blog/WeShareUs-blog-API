import * as Router from 'koa-joi-router';
import get from './get';

export const todosRouter = Router();

todosRouter.prefix('/todos');
todosRouter.route([get]);

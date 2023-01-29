import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { TodoService } from '../../../services/todo/application/todo.service';
import type { User } from '../../../services/user/domain/user.entity';
import { TodoItem } from '../../../services/todo/domain/todo.entity';

const bodySchema = Joi.object({
  id: Joi.string().required(),
  todoItems: Joi.array()
    .items({
      id: Joi.number().optional(),
      content: Joi.string().required(),
      done: Joi.boolean().required(),
    })
    .required(),
}).required();
export default {
  path: '/todos',
  method: 'PATCH',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      200: {
        body: {},
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { id, todoItems }: { id: string; todoItems: TodoItem[] } = ctx.request.body;
    const { user } = ctx.state as { user: User };

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.edit({ user }, { id, todoItems });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;

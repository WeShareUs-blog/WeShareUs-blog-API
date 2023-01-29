import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { PublishedDate } from '../../../types';
import { TodoService } from '../../../services/todo/application/todo.service';
import type { User } from '../../../services/user/domain/user.entity';

const querySchema = Joi.object({
  publishedDate: Joi.string().required().description('생성된 날짜'),
}).required();
const outputSchema = Joi.object({
  id: Joi.string().required(),
  publishedDate: Joi.string().required(),
  userId: Joi.string().required(),
  todoItems: Joi.array().items({
    id: Joi.number().required(),
    content: Joi.string().required(),
    done: Joi.boolean().required(),
  }),
}).required();
export default {
  path: '/todos',
  method: 'GET',
  validate: {
    query: querySchema,
    output: {
      200: {
        body: { data: outputSchema },
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { publishedDate } = ctx.request.query as { publishedDate: PublishedDate };
    const { user } = ctx.state as { user: User };

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    const data = await todoService.retrieve({ user }, { publishedDate });

    // 4. Send response
    ctx.body = { data };
  },
} as Spec;

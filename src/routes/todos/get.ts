import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { PublishedDate } from '../../types';
import { TodoService } from '../../services/todo/application/todo.service';

const querySchema = Joi.object({
  publishedDate: Joi.string().optional().description('조회하는 날짜'),
}).optional();
const outputSchema = Joi.array()
  .items({
    id: Joi.string().required().description('todo-uuid'),
    publishedDate: Joi.string().required().description('생성 날짜'),
    done: Joi.boolean().required().description('todo 유무'),
    content: Joi.string().required().description('todo 내용'),
  })
  .required();
export default {
  path: '/',
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

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    const data = await todoService.list({ publishedDate });

    // 4. Send response
    ctx.body = { data };
  },
} as Spec;

import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { TodoService } from '../../../services/todo/application/todo.service';
import { PublishedDate } from '../../../type';
import { RoleType, User } from '../../../services/user/domain/user.entity';

const bodySchema = Joi.object({
  publishedDate: Joi.string().required().description('todo 생성 날짜'),
  content: Joi.string().required().description('todo 할일 내용'),
  done: Joi.boolean().required().description('todo done'),
}).required();
export default {
  path: '/todos',
  method: 'POST',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      201: {
        body: {},
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const {
      publishedDate,
      content,
      done,
    }: { publishedDate: PublishedDate; content: string; done: boolean } = ctx.request.body;
    const { user } = ctx.state as { user: User };

    // 2. Get container service
    const todoService = Container.get(TodoService);

    // 3. Get service result
    await todoService.add({ user }, { publishedDate, content, done });

    // 4. Send response
    ctx.status = 201;
    ctx.body = {};
  },
} as Spec;

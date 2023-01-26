import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { UserService } from '../../../services/user/application/user.service';

const bodySchema = Joi.object({
  account: Joi.string().min(3).required().description('계정이름'),
  password: Joi.string().min(8).required().description('비밀번호'),
  confirmPassword: Joi.string().min(8).required().description('재확인 비밀번호'),
}).required();
export default {
  path: '/signup',
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
      account,
      password,
      confirmPassword,
    }: {
      account: string;
      password: string;
      confirmPassword: string;
    } = ctx.request.body;

    // 2. Get container service
    const userService = Container.get(UserService);

    // 3. Get service result
    await userService.register({ account, password, confirmPassword });

    // 4. Send response
    ctx.status = 201;
    ctx.body = {};
  },
} as Spec;

import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { UserService } from '../../../services/user/application/user.service';

const bodySchema = Joi.object({
  account: Joi.string().required().description('사용자 계정'),
  password: Joi.string().required().description('사용자 비밀번호'),
}).required();
const outputSchema = Joi.object({
  token: Joi.string().required().description('사용자 토큰'),
  nickname: Joi.string().required().description('사용자 account'),
});
export default {
  path: '/login',
  method: 'POST',
  validate: {
    type: 'json',
    body: bodySchema,
    output: {
      200: {
        body: { data: outputSchema },
      },
    },
  },
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { account, password } = ctx.request.body;

    // 2. Get container service
    const userService = Container.get(UserService);

    // 3. Get service result
    const data = await userService.login({ account, password });

    // 4. Send response
    ctx.body = { data };
  },
} as Spec;

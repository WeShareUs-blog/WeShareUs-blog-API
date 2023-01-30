import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { UserService } from '../../../../services/user/application/user.service';

const bodySchema = Joi.object({
  account: Joi.string().required(),
}).required();
export default {
  path: '/signup/check',
  method: 'POST',
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
    const { account }: { account: string } = ctx.request.body;

    // 2. Get container service
    const userService = Container.get(UserService);

    // 3. Get service result
    await userService.checkDuplicatedAccount({ account });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;

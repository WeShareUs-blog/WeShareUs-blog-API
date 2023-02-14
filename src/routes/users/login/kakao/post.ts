import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { KakaoLoginService } from '../../../../services/user/application/kakao-login.service';

const bodySchema = Joi.object({
  code: Joi.string().required().description('카카오 인가코드'),
}).required();
const outputSchema = Joi.object({
  token: Joi.string().required().description('로그인 토큰'),
  nickname: Joi.string().required().description('회원 닉네임'),
}).required();
export default {
  path: '/login/kakao',
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
    const { code }: { code: string } = ctx.request.body;

    // 2. Get container service
    const kakaoLoginService = Container.get(KakaoLoginService);

    // 3. Get service result
    const data = await kakaoLoginService.login({ code });

    // 4. Send response
    ctx.body = { data };
  },
} as Spec;

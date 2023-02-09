import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { KakaoLoginService } from '../../../../services/user/application/kakao-login.service';

export default {
  path: '/login/kakao',
  method: 'POST',
  validate: {},
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

import { Spec, Joi } from 'koa-joi-router';
import { Container } from 'typedi';
import { KakaoLoginService } from '../../../../services/user/application/kakao-login.service';

export default {
  path: '/login/kakao',
  method: 'GET',
  validate: {},
  handler: async (ctx) => {
    // 1. Get body, params, querystring
    const { code } = ctx.request.query as { code: string };

    // 2. Get container service
    const kakaoLoginService = Container.get(KakaoLoginService);

    // 3. Get service result
    const data = await kakaoLoginService.login({ code });

    // 4. Send response
    ctx.body = {};
  },
} as Spec;

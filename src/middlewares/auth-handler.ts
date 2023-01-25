import { Context } from 'koa';
import { Container } from 'typedi';
import * as koaJwt from 'koa-jwt';
import { unauthorized } from '@hapi/boom';
import { UserRepository } from '../services/user/infrastructure/user.repository';
import { JWT_SECRET_KEY } from '../libs/jwt';

export const jwtValidateHandler = koaJwt({
  secret: JWT_SECRET_KEY,
});

export const authHandler = async (ctx: Context, next: () => Promise<any>) => {
  const { user: decodedToken } = ctx.state;
  const userRepository = Container.get(UserRepository);
  const user = await userRepository.findOne({ id: decodedToken.id });

  if (!user) {
    const error = unauthorized('존재하지 않는 게정입니다.');
    error.data = { errorMessage: 'Unauthorized' };
    throw error;
  }
  ctx.state.user = user;

  await next();
};

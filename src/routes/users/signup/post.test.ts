import * as Joi from 'joi';
import Spec from './post';

describe('POST /users/signup', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      account: 'account',
      nickname: 'nickname',
      password: '비밀번호486!',
      confirmPassword: '비밀번호486!',
    });

    expect(error).toBeUndefined();
  });
});

import * as Joi from 'joi';
import Spec from './post';

describe('POST /users/login', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      account: 'account',
      password: '비밀번호486',
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 output', () => {
    const output = Spec.validate?.output?.[200] as { body: { data: Joi.AnySchema } };
    const { error } = output.body.data.validate({
      token: 'access token',
    });

    expect(error).toBeUndefined();
  });
});

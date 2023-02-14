import * as Joi from 'joi';
import Spec from './post';

describe('POST /users/login/kakao', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      code: 'kakao authorization code',
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 output', () => {
    const output = Spec.validate?.output?.[200] as { body: { data: Joi.AnySchema } };
    const { error } = output.body.data.validate({
      token: 'token',
      nickname: 'test',
    });

    expect(error).toBeUndefined();
  });
});

import * as Joi from 'joi';
import Spec from './post';

describe('POST /users/signup/check', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      account: 'account',
    });

    expect(error).toBeUndefined();
  });
});

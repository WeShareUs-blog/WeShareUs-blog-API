import * as Joi from 'joi';
import Spec from './post';

describe('POST /admins/todos', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      publishedDate: '2023-01-25',
      content: 'content',
      done: false,
    });

    expect(error).toBeUndefined();
  });
});

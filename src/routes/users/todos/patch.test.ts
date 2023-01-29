import * as Joi from 'joi';
import Spec from './patch';

describe('PATCH /users/todos', () => {
  it('정상적인 body', () => {
    const body = Spec.validate?.body as Joi.AnySchema;
    const { error } = body.validate({
      id: 'uuid',
      todoItems: [
        {
          id: 1,
          content: 'content-1',
          done: false,
        },
        {
          content: 'content-2',
          done: false,
        },
      ],
    });

    expect(error).toBeUndefined();
  });
});

import * as Joi from 'joi';
import Spec from './get';

describe('GET /users/todos', () => {
  it('정상적인 query', () => {
    const query = Spec.validate?.query as Joi.AnySchema;
    const { error } = query.validate({
      publishedDate: '2023-01-26',
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 output', () => {
    const output = Spec.validate?.output?.[200] as { body: { data: Joi.AnySchema } };
    const { error } = output.body.data.validate({
      id: 'todo-uuid',
      publishedDate: '2023-01-26',
      userId: 'user-uuid',
      todoItems: [
        {
          id: 1,
          content: 'content-1',
          done: false,
        },
        {
          id: 2,
          content: 'content-2',
          done: false,
        },
      ],
    });

    expect(error).toBeUndefined();
  });
});

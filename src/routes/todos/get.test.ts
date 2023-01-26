import * as Joi from 'joi';
import Spec from './get';

describe('GET /todos', () => {
  it('정상적인 query', () => {
    const query = Spec.validate?.query as Joi.AnySchema;
    const { error } = query.validate({
      publishedDate: '2023-01-01',
    });

    expect(error).toBeUndefined();
  });

  it('정상적인 output', () => {
    const output = Spec.validate?.output?.[200] as { body: { data: Joi.AnySchema } };
    const { error } = output.body.data.validate([
      {
        id: 'todo-uuid-1',
        publishedDate: '2023-01-01',
        content: 'content',
        done: false,
      },
      {
        id: 'todo-uuid-2',
        publishedDate: '2023-01-01',
        content: 'content-2',
        done: true,
      },
    ]);

    expect(error).toBeUndefined();
  });
});

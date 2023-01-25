import { Todo } from './todo.entity';

describe('Todo Entity 테스트', () => {
  describe('Of() 메소드 테스트', () => {
    it('정상적으로 Todo 객체를 생성한다.', () => {
      const todo = Todo.Of({ publishedDate: '2023-01-23', done: false, content: 'content' });

      expect(todo).toEqual({
        publishedDate: '2023-01-23',
        content: 'content',
        done: false,
      });
    });
  });
});

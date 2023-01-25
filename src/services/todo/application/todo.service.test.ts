import { plainToInstance } from 'class-transformer';
import { forbidden } from '@hapi/boom';
import { TodoService } from './todo.service';
import { TodoRepository } from '../infrastructure/todo.repository';
import { User } from '../../user/domain/user.entity';
import { Todo } from '../domain/todo.entity';

jest.mock('../infrastructure/todo.repository');

describe('TodoService 테스트', () => {
  const todoService = new TodoService();
  const todoRepository = jest.mocked(new TodoRepository());

  Object.assign(todoService, { todoRepository });

  describe('list() 메소드 테스트', () => {
    it('정상적으로 todo list를 반환한다.', async () => {
      todoRepository.find.mockResolvedValue([
        plainToInstance(Todo, {
          id: 'todo-uuid-1',
          publishedDate: '2023-01-01',
          done: false,
          content: 'todo 내용',
        }),
        plainToInstance(Todo, {
          id: 'todo-uuid-2',
          publishedDate: '2023-01-01',
          done: false,
          content: 'todo 내용-2',
        }),
      ]);

      expect(await todoService.list({ publishedDate: '2023-01-01' })).toEqual([
        {
          id: 'todo-uuid-1',
          publishedDate: '2023-01-01',
          done: false,
          content: 'todo 내용',
        },
        {
          id: 'todo-uuid-2',
          publishedDate: '2023-01-01',
          done: false,
          content: 'todo 내용-2',
        },
      ]);
    });
  });

  describe('add() 메소드 테스트', () => {
    it('정상적으 save를 호출한다.', async () => {
      todoRepository.save.mockResolvedValue(plainToInstance(Todo, {}));
      await todoService.add(
        {
          user: plainToInstance(User, {
            id: 'user-uuid',
            account: 'account',
            role: 'admin',
          }),
        },
        {
          publishedDate: '2023-01-25',
          content: 'content',
          done: false,
        }
      );
      expect(todoRepository.save).toHaveBeenCalledTimes(1);
      expect(todoRepository.save.mock.calls[0][0]).toEqual({
        content: 'content',
        done: false,
        publishedDate: '2023-01-25',
      });
    });
    it('role !== admin이면 에러를 던진다.', () => {
      expect.assertions(1);
      expect(() =>
        todoService.add(
          {
            user: plainToInstance(User, {
              id: 'user-uuid',
              account: 'account',
              role: 'general',
            }),
          },
          {
            publishedDate: '2023-01-25',
            content: 'content',
            done: false,
          }
        )
      ).rejects.toThrowError(forbidden('account does not have permission to create Todo.'));
    });
  });
});

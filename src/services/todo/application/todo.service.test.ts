import { plainToInstance } from 'class-transformer';
import { badRequest } from '@hapi/boom';
import { TodoService } from './todo.service';
import { TodoRepository } from '../infrastructure/todo.repository';
import { Todo } from '../domain/todo.entity';
import { User } from '../../user/domain/user.entity';

jest.mock('../infrastructure/todo.repository');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('TodoService 테스트', () => {
  const todoService = new TodoService();
  const todoRepository = jest.mocked(new TodoRepository());

  Object.assign(todoService, { todoRepository });

  describe('retrieve() 메소드 테스트', () => {
    it('todo가 존재하지 않는다면 save를 호출한다.', async () => {
      todoRepository.findOne.mockResolvedValue(null);
      todoRepository.save.mockResolvedValue(
        plainToInstance(Todo, {
          id: 'todo-uuid',
          publishedDate: '2023-01-26',
          userId: 'userId',
          todoItems: [],
        })
      );

      await todoService.retrieve(
        {
          user: plainToInstance(User, {
            id: 'id',
            account: 'account',
            password: '1234',
            role: 'general',
          }),
        },
        { publishedDate: '2023-01-26' }
      );
      expect(todoRepository.save).toHaveBeenCalledTimes(1);
    });

    it('todo가 존재한다면 정상적으로 반환한다.', async () => {
      todoRepository.findOne.mockResolvedValue(
        plainToInstance(Todo, {
          id: 'todo-uuid',
          publishedDate: '2023-01-26',
          userId: 'userId',
          todoItems: [],
        })
      );

      expect(
        await todoService.retrieve(
          {
            user: plainToInstance(User, {
              id: 'id',
              account: 'account',
              password: '1234',
              role: 'general',
            }),
          },
          {
            publishedDate: '2023-01-26',
          }
        )
      ).toEqual({
        id: 'todo-uuid',
        publishedDate: '2023-01-26',
        userId: 'userId',
        todoItems: [],
      });
    });
  });

  describe('edit() 메소드 테스트', () => {
    it('정상적으로 todo를 수정한다.', async () => {
      const todo = plainToInstance(Todo, {
        id: 'todo-uuid',
        publishedDate: '2023-01-01',
        todoItems: [
          {
            id: 1,
            content: 'content',
            done: false,
          },
        ],
      });

      todoRepository.findOne.mockResolvedValue(todo);
      todoRepository.save.mockResolvedValue(
        plainToInstance(Todo, {
          id: 'todo-uuid',
          publishedDate: '2023-01-01',
          todoItems: [],
        })
      );

      await todoService.edit(
        {
          user: plainToInstance(User, {
            id: 'uuid',
            account: 'account',
          }),
        },
        {
          id: 'todo-uuid',
          todoItems: [],
        }
      );

      expect(todoRepository.save).toHaveBeenCalledTimes(1);
      expect(todo).toEqual({ id: 'todo-uuid', publishedDate: '2023-01-01', todoItems: [] });
    });
    it('존재하지 않는 todo라면 에러를 발생시킨다', async () => {
      todoRepository.findOne.mockResolvedValue(null);

      await expect(() =>
        todoService.edit(
          {
            user: plainToInstance(User, {
              id: 'uuid',
              account: 'account',
            }),
          },
          {
            id: 'todo-uuid',
            todoItems: [],
          }
        )
      ).rejects.toThrow(badRequest('This todo does not exist.'));
    });
  });
});

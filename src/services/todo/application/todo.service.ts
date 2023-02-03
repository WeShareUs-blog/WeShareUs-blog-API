import { Inject, Service } from 'typedi';
import { badRequest } from '@hapi/boom';
import { TodoRepository } from '../infrastructure/todo.repository';
import { PublishedDate } from '../../../types';
import { User } from '../../user/domain/user.entity';
import { Todo, TodoItem } from '../domain/todo.entity';

@Service()
export class TodoService {
  @Inject()
  private readonly todoRepository!: TodoRepository;

  // NOTE: 없는 경우에는 해당 날짜에 대한 Todo를 생성하자.
  /**
   *
   * @param user - 사용자
   * @param publishedDate - 조회 날짜
   */
  async retrieve({ user }: { user: User }, { publishedDate }: { publishedDate: PublishedDate }) {
    const todo = await this.todoRepository.findOne({ publishedDate, userId: user.id });

    if (!todo) {
      const newTodo = await this.todoRepository.save(Todo.Of({ publishedDate, userId: user.id }));
      return {
        id: newTodo.id,
        userId: newTodo.userId,
        publishedDate: newTodo.publishedDate,
        todoItems: [],
      };
    }
    return todo;
  }

  /**
   *
   * @param user - 사용자 계정
   * @param id - todo uuid
   * @param todoItems - todo 항목들
   * @description todo 목록 수정 API
   */
  async edit({ user }: { user: User }, { id, todoItems }: { id: string; todoItems: TodoItem[] }) {
    const todo = await this.todoRepository.findOne({ id, userId: user.id });

    if (!todo) {
      throw badRequest('This todo does not exist.', { errorMessage: 'This todo does not exist.' });
    }
    const updateProps = {
      todoItems: todoItems.map((todoItem) => {
        return { content: todoItem.content, done: todoItem.done };
      }),
    };

    await todo.update(updateProps);
    await this.todoRepository.save(todo);
  }
}

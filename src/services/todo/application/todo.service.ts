import { Inject, Service } from 'typedi';
import { TodoRepository } from '../infrastructure/todo.repository';
import { PublishedDate } from '../../../types';
import { User } from '../../user/domain/user.entity';
import { Todo } from '../domain/todo.entity';

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
      return this.todoRepository.save(Todo.Of({ publishedDate, userId: user.id }));
    }
    return todo;
  }
}

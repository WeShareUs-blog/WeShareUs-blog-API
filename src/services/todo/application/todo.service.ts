import { Inject, Service } from 'typedi';
import { forbidden } from '@hapi/boom';
import { PublishedDate } from '../../../types';
import { User } from '../../user/domain/user.entity';
import { Todo } from '../domain/todo.entity';
import { TodoRepository } from '../infrastructure/todo.repository';

@Service()
export class TodoService {
  @Inject()
  private readonly todoRepository!: TodoRepository;

  /**
   *
   * @param publishedDate - 조회하는 날짜
   * @description todo 목록 조회
   */
  async list({ publishedDate }: { publishedDate?: PublishedDate }) {
    return this.todoRepository.find({ publishedDate });
  }

  /**
   *
   * @param user
   * @param publishedDate - 생성 날짜
   * @param content - todo 내용
   * @param done - todo 유무
   * @description todo 생성 API
   */
  async add(
    { user }: { user: User },
    {
      publishedDate,
      content,
      done,
    }: {
      publishedDate: PublishedDate;
      content: string;
      done: boolean;
    }
  ) {
    if (user.role !== 'admin') {
      throw forbidden(`${user.account} does not have permission to create Todo.`, {
        errorMessage: `${user.account} does not have permission to create Todo.`,
      });
    }

    const todo = Todo.Of({ publishedDate, content, done });
    await this.todoRepository.save(todo);
  }
}

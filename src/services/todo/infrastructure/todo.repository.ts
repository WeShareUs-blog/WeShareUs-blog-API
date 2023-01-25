import { Service } from 'typedi';
import { Repository } from '../../../libs/repository';
import { Todo } from '../domain/todo.entity';

@Service()
export class TodoRepository extends Repository<Todo> {
  constructor() {
    super(Todo);
  }

  async save(todo: Todo) {
    return this.getManager().save(todo);
  }
}

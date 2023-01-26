import { Service } from 'typedi';
import * as _ from 'lodash';
import { Repository } from '../../../libs/repository';
import { Todo } from '../domain/todo.entity';
import { PublishedDate } from '../../../types';

@Service()
export class TodoRepository extends Repository<Todo> {
  constructor() {
    super(Todo);
  }

  async find(args?: { publishedDate?: PublishedDate }) {
    return this.getManager().find({ where: strip(args) });
  }

  async save(todo: Todo) {
    return this.getManager().save(todo);
  }
}

function strip(args: any) {
  return _.omitBy(args, (value) => value === undefined);
}

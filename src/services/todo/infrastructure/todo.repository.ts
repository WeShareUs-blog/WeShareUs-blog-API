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

  save(todo: Todo) {
    return this.getManager().save(todo);
  }

  findOne(args: { publishedDate?: PublishedDate; userId?: string }) {
    return this.getManager().findOne({ where: strip(args) });
  }
}

function strip(args: any) {
  return _.omitBy(args, (value) => value === undefined);
}

import { Service } from 'typedi';
import * as _ from 'lodash';
import { Repository } from '../../../libs/repository';
import { RoleType, User } from '../domain/user.entity';

@Service()
export class UserRepository extends Repository<User> {
  constructor() {
    super(User);
  }

  async save(user: User) {
    return this.getManager().save(user);
  }

  async findOne(args: { id?: string; account?: string; role?: RoleType }) {
    return this.getManager().findOne({ where: strip(args) });
  }
}

function strip(args: any) {
  return _.omitBy(args, (value) => value === undefined);
}

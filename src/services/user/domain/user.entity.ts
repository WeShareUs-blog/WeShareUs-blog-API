import { Column, Entity } from 'typeorm';
import { badRequest } from '@hapi/boom';
import { Aggregate } from '../../../libs/aggregate';
import { comparePassword, hashPassword } from '../../../libs/bcryptjs';
import { createToken } from '../../../libs/jwt';

export type RoleType = 'general' | 'admin';
@Entity()
export class User extends Aggregate {
  @Column()
  role!: RoleType;

  @Column()
  account!: string;

  @Column()
  nickname!: string;

  @Column()
  password!: string;

  constructor(args: {
    account: string;
    nickname: string;
    password: string;
    confirmPassword?: string;
  }) {
    super();
    if (args) {
      if (args.confirmPassword && args.password !== args.confirmPassword) {
        throw badRequest('Passwords do not match.', { errorMessage: 'Passwords do not match.' });
      }

      // NOTE: admin 계정은 직접 DB로 넣어서 생성해야한다.
      this.role = 'general';
      this.account = args.account;
      this.nickname = args.nickname;
      this.password = hashPassword(args.password);
    }
  }

  static Of(args: {
    account: string;
    nickname: string;
    password: string;
    confirmPassword?: string;
  }) {
    return new User(args);
  }

  isCorrectPassword(plainPassword: string) {
    return comparePassword(plainPassword, this.password);
  }

  signAccessToken() {
    return createToken({ id: this.id, account: this.account, role: this.role });
  }
}

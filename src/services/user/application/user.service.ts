import { Inject, Service } from 'typedi';
import { badRequest } from '@hapi/boom';
import { UserRepository } from '../infrastructure/user.repository';

@Service()
export class UserService {
  @Inject()
  private readonly userRepository!: UserRepository;

  async login({ account, password }: { account: string; password: string }) {
    const user = await this.userRepository.findOne({ account });

    if (!user) {
      throw badRequest(`${account}는 존재하지 않는 계정입니다.`, {
        errorMessage: '아이디 또는 비밀번호가 틀렸습니다.',
      });
    }

    if (!user.isCorrectPassword(password)) {
      throw badRequest(`${account}의 비밀번호가 틀렸습니다.`, {
        errorMessage: '아이디 또는 비밀번호가 틀렸습니다.',
      });
    }
    return { token: user.signAccessToken() };
  }
}

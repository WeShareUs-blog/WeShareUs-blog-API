import { plainToInstance } from 'class-transformer';
import { UserService } from './user.service';
import { UserRepository } from '../infrastructure/user.repository';
import { User } from '../domain/user.entity';

jest.mock('../infrastructure/user.repository');

describe('UserService 테스트', () => {
  const userService = new UserService();
  const userRepository = jest.mocked(new UserRepository());

  Object.assign(userService, { userRepository });
  describe('login() 메소드 테스트', () => {
    it('정상적으로 token을 발급한다.', async () => {
      const user = plainToInstance(User, {
        id: 'user-uuid',
        account: 'account',
        password: '1234',
      });

      userRepository.findOne.mockResolvedValue(user);
      jest.spyOn(user, 'isCorrectPassword').mockImplementation(() => true);
      jest.spyOn(user, 'signAccessToken').mockImplementation(() => 'token');

      expect(await userService.login({ account: 'account', password: '1234' })).toEqual({
        token: 'token',
      });
    });
  });
});

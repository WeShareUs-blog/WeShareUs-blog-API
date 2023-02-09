import { plainToInstance } from 'class-transformer';
import { badRequest } from '@hapi/boom';
import { UserService } from './user.service';
import { UserRepository } from '../infrastructure/user.repository';
import { User } from '../domain/user.entity';

jest.mock('../infrastructure/user.repository');

describe('UserService 테스트', () => {
  const userService = new UserService();
  const userRepository = jest.mocked(new UserRepository());

  Object.assign(userService, { userRepository });

  describe('register() 메소드 테스트', () => {
    it('이미 존재하는 account면 에러를 발생시킨다.', async () => {
      userRepository.findOne.mockResolvedValue(
        plainToInstance(User, {
          id: 'user-uuid',
          account: 'account',
          nickname: 'nickname',
          password: 'hashedPassword',
        })
      );

      expect.assertions(1);
      await expect(() =>
        userService.register({
          account: 'account',
          nickname: 'nickname',
          password: '1234',
          confirmPassword: '1234',
        })
      ).rejects.toThrow(badRequest('account already exists.'));
    });

    it('정상적으로 save를 호출한다.', async () => {
      userRepository.findOne.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(
        plainToInstance(User, {
          id: 'user-uuid',
          account: 'account',
          nickname: 'nickname',
          password: 'hashedPassword',
        })
      );

      await userService.register({
        account: 'account',
        nickname: 'nickname',
        password: '1234',
        confirmPassword: '1234',
      });
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });

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
        account: 'account',
      });
    });
  });

  describe('checkDuplicatedAccount() 메소드 테스트', () => {
    it('account가 중복되지 않았으면 에러를 발생시키지 않는다.', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(() =>
        userService.checkDuplicatedAccount({ account: 'account' })
      ).not.toThrowError();
    });

    it('account로 등록된 유저가 존재하면 에러를 던진다.', async () => {
      userRepository.findOne.mockResolvedValue(
        plainToInstance(User, {
          id: 'user-uuid',
          account: 'account',
          password: 'hashedPassword',
        })
      );

      expect.assertions(1);
      await expect(() =>
        userService.checkDuplicatedAccount({ account: 'account' })
      ).rejects.toThrow(badRequest('account already exists.'));
    });
  });
});

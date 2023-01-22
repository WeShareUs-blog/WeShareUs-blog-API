import { badRequest } from '@hapi/boom';
import { User } from './user.entity';
import { hashPassword } from '../../../libs/bcryptjs';

jest.mock('../../../libs/bcryptjs');

describe('User Entity 테스트', () => {
  describe('User 객체 생성 테스트', () => {
    it('정상적으로 User 객체를 생성한다.', () => {
      jest.mocked(hashPassword).mockImplementation(() => 'mocked password');
      expect(User.Of({ account: 'account', password: '1234', confirmPassword: '1234' })).toEqual({
        role: 'general',
        account: 'account',
        password: 'mocked password',
      });
    });

    it('비밀번호와 재확인 비밀번호가 서로 다르면 에러를 발생시킨다.', () => {
      expect.assertions(1);
      expect(() =>
        User.Of({ account: 'account', password: '1234', confirmPassword: '비밀번호486' })
      ).toThrowError(badRequest('Passwords do not match.'));
    });
  });
});

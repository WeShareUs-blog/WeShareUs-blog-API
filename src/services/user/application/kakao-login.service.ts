import { Inject, Service } from 'typedi';
import axios from 'axios';
import { UserRepository } from '../infrastructure/user.repository';
import { decodedToken } from '../../../libs/jwt';
import { User } from '../domain/user.entity';

type KakaoAuthResponseTypes = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
};
@Service()
export class KakaoLoginService {
  @Inject()
  private readonly userRepository!: UserRepository;

  /**
   *
   * @param code
   */
  async login({ code }: { code: string }) {
    const kakaoAuthResponse = await axios.post<KakaoAuthResponseTypes>(
      'https://kauth.kakao.com/oauth/token',
      {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        code,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const { nickname, email } = decodedToken<{ nickname: string; email: string }>(
      kakaoAuthResponse.data.id_token
    );

    const user = await this.userRepository.findOne({ account: email });
    if (!user) {
      const randomNumber = Math.floor(Math.random() * 10000);
      const newUser = await this.userRepository.save(
        User.Of({ account: email, nickname, password: `${email}${randomNumber}` })
      );
      return { token: newUser.signAccessToken(), nickname: newUser.nickname };
    }
    return { token: user.signAccessToken(), nickname: user.nickname };
  }
}

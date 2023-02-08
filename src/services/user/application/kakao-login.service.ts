import { Inject, Service } from 'typedi';
import axios from 'axios';
import { UserRepository } from '../infrastructure/user.repository';

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
    console.log(kakaoAuthResponse.data.access_token);
    return this;
  }
}

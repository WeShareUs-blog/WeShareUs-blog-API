import post from './post';
import { kakaoLoginRoutes } from './kakao';

export const loginRoutes = [post, ...kakaoLoginRoutes];

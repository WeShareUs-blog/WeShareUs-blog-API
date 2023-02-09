import { decode, sign } from 'jsonwebtoken';

export const JWT_SECRET_KEY = 'development-secret-key';

export function createToken(data: any) {
  return sign(data, JWT_SECRET_KEY);
}

export function decodedToken<T>(token: string) {
  return decode(token) as T;
}

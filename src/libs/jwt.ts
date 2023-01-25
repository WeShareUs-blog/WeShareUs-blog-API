import { sign } from 'jsonwebtoken';

export const JWT_SECRET_KEY = 'development-secret-key';

export function createToken(data: any) {
  return sign(data, JWT_SECRET_KEY);
}

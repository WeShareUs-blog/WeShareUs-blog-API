import { sign } from 'jsonwebtoken';

export function createToken(data: any) {
  return sign(data, String(process.env.JWT_SECRET_TOKEN));
}

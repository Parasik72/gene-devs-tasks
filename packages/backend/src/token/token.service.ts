import jwt from 'jsonwebtoken';
import { TokenPayload } from './token.types';
import { JWT_ACCESS_EXPIRATION, JWT_ACCESS_SECRET } from './token.constants';

export class TokenService {
  generateAccessToken(payload: TokenPayload) {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
  }
}

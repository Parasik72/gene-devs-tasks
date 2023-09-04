import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { TokenPayload } from '../token/token.types';
import { TokenService } from '../token/token.service';

const tokenService = new TokenService();

export const isLogedIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException('No authorization', 401);
    }
    const userJWT = tokenService.verifyToken(token);
    const user = userJWT as TokenPayload;
    if (!user) {
      throw new HttpException('No authorization', 401);
    }
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};

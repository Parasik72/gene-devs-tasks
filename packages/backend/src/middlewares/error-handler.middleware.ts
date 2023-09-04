import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { HttpException } from '../exceptions/http.exception';

export const errorHandlerMiddleware = (
  err: HttpException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({ error: err.message });
  }
  return res.status(500).json({ error: `Server error:\n${err.message}` });
};

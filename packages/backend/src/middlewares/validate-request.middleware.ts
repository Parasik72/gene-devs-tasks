import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import { HttpException } from '../exceptions/http.exception';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const resultFactory = validationResult.withDefaults({
      formatter: (error) => `${error.param}: ${error.msg}`
    });
    const errors = resultFactory(req);
    if (!errors.isEmpty()) {
      throw new HttpException(errors.array().join(', '), 400);
    }
    next();
  } catch (err) {
    next(err);
  }
};

import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../exceptions/http.exception';
import mongoose from 'mongoose';

type fromType = 'body' | 'params';

export const validateObjectId = 
  (from: fromType, key: string) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req[from][key];
        if (!id) {
          throw new HttpException(`The item in req[${from}][${key}] was not found`, 404);
        }
        if (!mongoose.isValidObjectId(id)) {
          throw new HttpException(`The ${key} must be an ObjectId`, 400);
        }
        next();
      } catch(error) {
        next(error);
      }
    };

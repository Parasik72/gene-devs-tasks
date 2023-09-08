import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../exceptions/http.exception';

function hasDuplicates<T>(array: T[], keyExtractor?: (item: T) => any) {
  const seen = new Set<T>();
  for (const item of array) {
    const value = keyExtractor ? keyExtractor(item) : item;
    if (seen.has(value)) {
      return true;
    }
    seen.add(value);
  }
  return false;
}

export const duplicateValues = 
  <T extends Object, K>(
    arrayKey: keyof T,
    errMsg: string,
    keyExtractor?: (item: K) => any
  ) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const array = req.body[arrayKey];
        if (!array) {
          return next();
        }
        if (hasDuplicates(array, keyExtractor)) {
          throw new HttpException(errMsg, 400);
        }
        next();
      } catch(error) {
        next(error);
      }
    };

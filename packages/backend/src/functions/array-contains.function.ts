import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';

export const arrayContains = 
  <T extends Object>(
    arrayKey: keyof T, 
    mustContainKey: keyof T, 
    errMsg: string,
    deepKey?: string
  ) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const array = req.body[arrayKey];
        const mustContain = req.body[mustContainKey];
        if (!array || !mustContain) {
          throw new HttpException(errMsg, 400);
        }
        let result = true;
        if (deepKey && Array.isArray(mustContain)) {
          mustContain.forEach((mustContainItem) => {
            const find = array.find((arrayItem: any) => arrayItem[deepKey] === mustContainItem[deepKey]);
            if (!find) {
              throw new HttpException(errMsg, 400);
            }
          });
        } else {
          result = array.includes(mustContain);
        }
        if (!result) {
          throw new HttpException(errMsg, 400);
        }
        next();
      } catch(error) {
        next(error);
      }
    };

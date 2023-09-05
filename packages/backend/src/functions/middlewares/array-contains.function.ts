import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../exceptions/http.exception';

export const arrayContains = 
  <T extends Object, K>(
    arrayKey: keyof T, 
    mustContainKey: keyof T, 
    errMsg: string,
    keyExtractor?: (item: K) => any
  ) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const array = req.body[arrayKey];
        const mustContain = req.body[mustContainKey];
        if (!array) {
          throw new HttpException(`The field ${arrayKey.toString()} was not found`, 404);
        }
        if (!mustContain) {
          throw new HttpException(`The field ${mustContainKey.toString()} was not found`, 404);
        }
        let result = true;
        if (Array.isArray(mustContain)) {
          mustContain.forEach((mustContainItem) => {
            const find = array.find((arrayItem: any) => {
              const first = keyExtractor ? keyExtractor(arrayItem) : arrayItem;
              const second = keyExtractor ? keyExtractor(mustContainItem) : mustContainItem;
              return first === second;
            } );
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

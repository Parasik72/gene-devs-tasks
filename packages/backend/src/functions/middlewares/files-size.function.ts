import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../exceptions/http.exception';

export const filesMaxSize = (maxSizeMB: number) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) {
        return next();
      }
      const maxFileSize = maxSizeMB * (1024 ** 2);
      const files = Object.values(req.files).flat();
      files.every((file) => {
        if (file.size > maxFileSize) {
          throw new HttpException(`File ${file.name} exceeded limit of ${maxSizeMB}MB`, 400);
        }
      });
      next();
    } catch(error) {
      next(error);
    }
  };

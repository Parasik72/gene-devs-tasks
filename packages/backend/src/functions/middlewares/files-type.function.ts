import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../exceptions/http.exception';

export const filesExtensions = (extensions: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) {
        return next();
      }
      const files = Object.values(req.files).flat();
      files.every((file) => {
        const extension = file.name.split('.').pop() || '';
        if (!extensions.includes(extension)) {
          throw new HttpException(
            `File ${file.name} must be on these extesnsions: ${extensions.join(', ')}`, 
            400
          );
        }
      });
      next();
    } catch(error) {
      next(error);
    }
  };

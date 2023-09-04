import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { HttpException } from '../exceptions/http.exception';

export const tryCatchController = <TParams extends ParamsDictionary, T>(
  controllerFunc: (req: Request<TParams, {}, T>, res: Response) => Promise<any>, 
  expectedStatusCode: number = 200
) => {
  return async (req: Request<TParams, {}, T>, res: Response) => {
    try {
      return res.status(expectedStatusCode).json(await controllerFunc(req, res));
    } catch (error) {
      if (error instanceof HttpException)
        return res.status(error.statusCode).json({ message: error.message });
      return res.status(500).json({ message: 'Server error.' });
    }
  };
};

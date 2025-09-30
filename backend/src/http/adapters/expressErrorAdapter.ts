import { NextFunction, Request, Response } from 'express';
import { HttpErrorHandler } from '..';

export const adaptExpressErrorHandler = (handler: HttpErrorHandler) => {
  return async (
    error: Error,
    _expressRequest: Request,
    expressResponse: Response,
    _expressNext: NextFunction
  ) => {
    const { status, data } = handler.handle(error);

    return expressResponse.status(status).send(data);
  };
};

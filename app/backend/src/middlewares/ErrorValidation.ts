import { NextFunction, Request, Response } from 'express';

export default class ErrorValidate {
  static errorHandle(err: Error, req: Request, res: Response, _next: NextFunction) {
    const { message } = err;
    return res.status(500).json({
      message,
    });
  }
}

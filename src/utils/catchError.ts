import { NextFunction, Request, Response } from 'express';

type FnType = (req: Request, res: Response, nextFn: NextFunction) => Promise<any>;

export const catchAsync = (fn: FnType) => {
  return (req: Request, res: Response, nextFn: NextFunction) => {
    fn(req, res, nextFn).catch(nextFn)
  }
}
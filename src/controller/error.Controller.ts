import { NextFunction, Request, Response } from "express";
import { CastError } from "mongoose";
import { AppError, StatusCode } from "../utils";
interface IError extends CastError {
  statusCode: number,
  message: string,
  status: 'fail' | 'error',
  stack: any,
  [key: string]: any,
};

const handleCastError = (err: IError): any => {
  const message: string = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, StatusCode.notFound)
}

const dupliaceKeyHandler = (err: IError): any => {
  const message =  `Duplicate field value ${JSON.stringify(err.keyValue)}, please change the value.`;
  return new AppError(message, 400)
}

const validationHandler = (err: IError): any => {

  const error = Object.values(err.errors).map((item: any) => item.message);

  return new AppError(`${error}`, 400)
}

export const errorHandler = (err: IError, req: Request, res: Response, nextFn: NextFunction) => {

  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong, please try again later';

  let error = {...err};

  if(err.name === 'CastError') {
    error = handleCastError(error);
  }else if( error.code === 11000 ) {
    error = dupliaceKeyHandler(error)
  }else if(err.name === 'ValidationError') {
    error = validationHandler(error)
  }

  res.status(error.statusCode).json(error);
}
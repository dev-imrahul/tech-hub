import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { errorHandler } from './controller';
import { AppError } from './utils';
import { userRouter } from './routes';

const app = express();
app.use(express.json());
app.use('/api/v1/user', userRouter)
app.use('/', (req, res) => {
  res.status(200).json({
    message: 'You are conencted',
    success: true
  })
})
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
});

app.use(errorHandler);

export default app;
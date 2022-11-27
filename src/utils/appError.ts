export class AppError extends Error {
  public status: 'fail' | 'error' | undefined = undefined;
  public success: boolean = false;

  constructor(public message: string, public statusCode: number) {
    super();
    // this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor)
  }

}
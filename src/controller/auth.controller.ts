import { StatusCode } from './../utils/interface/statusCode';
import { catchAsync } from "../utils";
import { User } from '../models';

export const signup = catchAsync(async(req, res, next) => {
  const data = await User.create(req.body);

  res.status(StatusCode.success).json({
    data
  })
})
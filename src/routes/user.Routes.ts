import express from "express";
import { signup } from './../controller';

export const userRouter = express.Router();

userRouter.post('/signup', signup);
import express from 'express';
import userController from './user.controller';
import { validateRequest } from '../middlewares/validate-request.middleware';
import { tryCatchController } from '../middlewares/try-catch-controller.middleware';
import { registerValidator } from './validators/register.validator';
import { loginValidator } from './validators/login.validator';
import { isLogedIn } from '../middlewares/is-loged-in.middleware';

const userRouter = express();

userRouter.post(
  '/register',
  registerValidator,
  validateRequest,
  tryCatchController(userController.register.bind(userController), 201)
);

userRouter.post(
  '/login',
  loginValidator,
  validateRequest,
  tryCatchController(userController.login.bind(userController), 200)
);

userRouter.get(
  '/auth',
  isLogedIn,
  tryCatchController(userController.auth.bind(userController), 200)
);

export default userRouter;

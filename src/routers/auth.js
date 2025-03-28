import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/auth.js';
import { controllerWraper } from '../utils/controllerWraper.js';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  userRegisterController,
} from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  controllerWraper(userRegisterController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  controllerWraper(loginUserController),
);

authRouter.post(
  '/refresh',
  controllerWraper(refreshTokenController),
);

authRouter.post('/logout', controllerWraper(logoutUserController));
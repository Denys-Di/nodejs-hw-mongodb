import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  requestResetEmailController,
  resetPasswordController,
  userRegisterController,
} from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  controllerWrapper(userRegisterController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  controllerWrapper(loginUserController),
);

authRouter.post('/refresh', controllerWrapper(refreshTokenController));

authRouter.post('/logout', controllerWrapper(logoutUserController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  controllerWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  controllerWrapper(resetPasswordController),
);
import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import { contactsRouter } from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { authRouter } from './routers/auth.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(logger());
  app.use(cookieParser());

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.all('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
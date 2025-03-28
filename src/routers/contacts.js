import { Router } from 'express';

import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { controllerWraper } from '../utils/controllerWraper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

export const contactsRouter = Router();

contactsRouter.get('/', authenticate, controllerWraper(getContactsController));

contactsRouter.get(
  '/:contactId',
  authenticate,
  isValidId,
  controllerWraper(getContactByIdController),
);

contactsRouter.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  controllerWraper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  controllerWraper(updateContactByIdController),
);

contactsRouter.delete(
  '/:contactId',
  authenticate,
  isValidId,
  controllerWraper(deleteContactByIdController),
);
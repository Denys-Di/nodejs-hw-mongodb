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

export const contactsRouter = Router();

contactsRouter.get('/contacts', controllerWraper(getContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  isValidId,
  controllerWraper(getContactByIdController),
);

contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  controllerWraper(createContactController),
);

contactsRouter.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  controllerWraper(updateContactByIdController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  isValidId,
  controllerWraper(deleteContactByIdController),
);
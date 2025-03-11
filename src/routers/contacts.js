import { Router } from 'express';

import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { controllerWraper } from '../utils/controllerWraper.js';

export const contactsRouter = Router();

contactsRouter.get('/contacts', controllerWraper(getContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  controllerWraper(getContactByIdController),
);

contactsRouter.post('/contacts', controllerWraper(createContactController));

contactsRouter.patch(
  '/contacts/:contactId',
  controllerWraper(updateContactByIdController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  controllerWraper(deleteContactByIdController),
);
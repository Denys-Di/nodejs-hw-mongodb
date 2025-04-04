import { Router } from 'express';

import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

export const contactsRouter = Router();

contactsRouter.get('/', authenticate, controllerWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  authenticate,
  isValidId,
  controllerWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createContactSchema),
  controllerWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  authenticate,
  upload.single('photo'),
  isValidId,
  validateBody(updateContactSchema),
  controllerWrapper(updateContactByIdController),
);

contactsRouter.delete(
  '/:contactId',
  authenticate,
  isValidId,
  controllerWrapper(deleteContactByIdController),
);
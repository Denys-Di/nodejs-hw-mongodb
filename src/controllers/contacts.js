import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContactById,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
  if (contact) {
    return res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  }
  throw createHttpError(404, 'Contact not found');
};

export const createContactController = async (req, res) => {
  const contacts = await createContact({ ...req.body, userId: req.user._id });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contacts,
  });
};

export const updateContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContactById(contactId, req.user._id, req.body);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContactById(contactId, req.user._id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.sendStatus(204);
};
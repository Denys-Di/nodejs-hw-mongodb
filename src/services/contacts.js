import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (contactData) =>
  ContactsCollection.create(contactData);


export const updateContactById = (contactId, contactPayload, options = {}) =>
  ContactsCollection.findByIdAndUpdate(contactId, contactPayload, {
    new: true,
    ...options,
  });

  export const deleteContactById = (contactId) =>
    ContactsCollection.findByIdAndDelete(contactId);
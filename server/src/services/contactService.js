import Contact from '../models/Contact.js';

export async function createContact(data) {
  const contact = new Contact(data);
  return await contact.save();
}

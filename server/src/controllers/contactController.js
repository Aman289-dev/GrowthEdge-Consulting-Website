import { createContact } from '../services/contactService.js';

export async function submitContact(req, res, next) {
  try {
    const { name, email, phone, company, service, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required', statusCode: 400 });
    }
    const contact = await createContact({ name, email, phone, company, service, message });
    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
}

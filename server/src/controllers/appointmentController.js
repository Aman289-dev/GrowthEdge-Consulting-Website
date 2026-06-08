import { createAppointment } from '../services/appointmentService.js';

export async function bookAppointment(req, res, next) {
  try {
    const { name, email, phone, company, service, preferredDate, preferredTime, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required', statusCode: 400 });
    }
    const appointment = await createAppointment({ name, email, phone, company, service, preferredDate, preferredTime, message });
    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
}

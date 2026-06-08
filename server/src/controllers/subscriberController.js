import { createSubscriber } from '../services/subscriberService.js';

export async function subscribe(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required', statusCode: 400 });
    }
    const subscriber = await createSubscriber(email);
    res.status(201).json({ success: true, data: subscriber });
  } catch (err) {
    if (err.statusCode === 409) {
      return res.status(409).json({ success: false, error: err.message, statusCode: 409 });
    }
    next(err);
  }
}

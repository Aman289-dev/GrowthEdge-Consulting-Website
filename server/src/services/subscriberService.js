import Subscriber from '../models/Subscriber.js';

export async function createSubscriber(email) {
  const existing = await Subscriber.findOne({ email });
  if (existing) {
    const err = new Error('Email already subscribed');
    err.statusCode = 409;
    throw err;
  }
  const subscriber = new Subscriber({ email });
  return await subscriber.save();
}

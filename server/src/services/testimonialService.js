import Testimonial from '../models/Testimonial.js';

export async function listTestimonials() {
  return await Testimonial.find().sort({ featured: -1, createdAt: -1 });
}

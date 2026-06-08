import { listTestimonials } from '../services/testimonialService.js';

export async function getTestimonials(req, res, next) {
  try {
    const testimonials = await listTestimonials();
    res.json({ success: true, data: testimonials });
  } catch (err) {
    next(err);
  }
}

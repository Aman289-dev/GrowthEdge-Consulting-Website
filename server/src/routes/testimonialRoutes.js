import { Router } from 'express';
import { getTestimonials } from '../controllers/testimonialController.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    await getTestimonials(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;

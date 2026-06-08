import { Router } from 'express';
import { bookAppointment } from '../controllers/appointmentController.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    await bookAppointment(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;

import { Router } from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    await submitContact(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;

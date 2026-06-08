import { Router } from 'express';
import { subscribe } from '../controllers/subscriberController.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    await subscribe(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;

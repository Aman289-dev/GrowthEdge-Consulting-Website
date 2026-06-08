import { Router } from 'express';
import { getCaseStudies } from '../controllers/caseStudyController.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    await getCaseStudies(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;

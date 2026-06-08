import { Router } from 'express';
import { getPosts, getPost } from '../controllers/blogController.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    await getPosts(req, res, next);
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    await getPost(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default router;

import { listBlogPosts, getBlogPostBySlug } from '../services/blogService.js';

export async function getPosts(req, res, next) {
  try {
    const { category, search, page, limit } = req.query;
    const result = await listBlogPosts({ category, search, page, limit });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getPost(req, res, next) {
  try {
    const post = await getBlogPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found', statusCode: 404 });
    }
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
}

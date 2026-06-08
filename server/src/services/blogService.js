import BlogPost from '../models/BlogPost.js';

export async function listBlogPosts({ category, search, page = 1, limit = 6 }) {
  const query = { published: true };
  if (category && category !== 'All') query.category = category;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await BlogPost.countDocuments(query);
  const posts = await BlogPost.find(query)
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .select('-content');

  return { posts, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) };
}

export async function getBlogPostBySlug(slug) {
  const post = await BlogPost.findOneAndUpdate(
    { slug, published: true },
    { $inc: { views: 1 } },
    { new: true }
  );
  return post;
}

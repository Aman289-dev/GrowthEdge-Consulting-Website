import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import Badge from '../components/ui/Badge';
import { CardSkeleton } from '../components/ui/LoadingSpinner';
import NewsletterSection from '../components/shared/NewsletterSection';
import api from '../utils/api';
import { BLOG_CATEGORIES } from '../utils/constants';

const categoryColors = {
  Strategy: 'blue', Digital: 'indigo', Leadership: 'purple',
  Finance: 'green', Operations: 'orange', Growth: 'amber',
};

function BlogCard({ post, featured = false }) {
  const color = categoryColors[post.category] || 'blue';
  const gradients = {
    blue: 'from-blue-500 to-blue-700', indigo: 'from-indigo-500 to-indigo-700',
    purple: 'from-purple-500 to-purple-700', green: 'from-green-500 to-green-700',
    orange: 'from-orange-500 to-orange-700', amber: 'from-amber-500 to-amber-700',
  };

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="block group">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className={`h-48 bg-gradient-to-br ${gradients[color] || gradients.blue} flex items-center justify-center relative`}>
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
            <span className="text-white/30 text-8xl font-extrabold">{post.category?.[0]}</span>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Badge color={color}>{post.category}</Badge>
              <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />{post.readTime} min read
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                  {post.author?.[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">{post.author}</p>
                  <p className="text-xs text-slate-500">{post.authorRole}</p>
                </div>
              </div>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1">
                Read <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3 }}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      >
        <div className={`h-32 bg-gradient-to-br ${gradients[color] || gradients.blue} flex items-center justify-center relative`}>
          <span className="text-white/20 text-6xl font-extrabold">{post.category?.[0]}</span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge color={color}>{post.category}</Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}m</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
              {post.author?.[0]}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">{post.author}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => { document.title = 'Blog — GrowthEdge Consulting'; }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { limit: 6, page };
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const r = await api.get('/blog', { params });
      setPosts(r.data.data.posts);
      setTotalPages(r.data.data.totalPages);
    } catch (e) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [category, search, page]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  const featuredPost = page === 1 && !search && category === 'All' ? posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Strategic Insights
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-blue-200 max-w-2xl mb-8">
            Expert thinking on strategy, growth, and leadership from the GrowthEdge team.
          </motion.p>

          {/* Search */}
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSearch} className="flex gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-blue-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <button type="submit" className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors">
              Search
            </button>
          </motion.form>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <CardSkeleton count={6} />
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No articles found.</p>
              <button onClick={() => { setSearch(''); setSearchInput(''); setCategory('All'); setPage(1); }} className="mt-4 text-blue-600 hover:underline text-sm">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featuredPost && (
                <div className="mb-10">
                  <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-4">Featured Article</p>
                  <BlogCard post={featuredPost} featured />
                </div>
              )}

              {/* Grid */}
              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridPosts.map(post => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}

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
  'AI & Tech': 'indigo', Strategy: 'violet', Leadership: 'rose',
  Growth: 'cyan', Data: 'emerald', Operations: 'amber',
};

function BlogCard({ post, featured = false }) {
  const color = categoryColors[post.category] || 'indigo';
  const gradients = {
    indigo: 'from-indigo-600 to-violet-700', violet: 'from-violet-600 to-indigo-700',
    rose: 'from-rose-600 to-pink-700', cyan: 'from-cyan-600 to-blue-700',
    emerald: 'from-emerald-600 to-cyan-700', amber: 'from-amber-600 to-orange-700',
  };

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="block group">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0D1117] rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
        >
          <div className={`h-48 bg-gradient-to-br ${gradients[color] || gradients.indigo} flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-grid opacity-30" />
            <span className="text-white/10 text-9xl font-display font-bold">{post.category?.[0]}</span>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Badge color={color}>{post.category}</Badge>
              <span className="text-xs text-slate-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />{post.readTime} min read
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-100 mb-3 group-hover:text-indigo-300 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5 line-clamp-2 text-sm">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  {post.author?.[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-300">{post.author}</p>
                  <p className="text-xs text-slate-600">{post.authorRole}</p>
                </div>
              </div>
              <span className="text-indigo-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Read <ArrowRight className="w-3.5 h-3.5" />
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
        className="bg-[#0D1117] rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 h-full flex flex-col"
      >
        <div className={`h-28 bg-gradient-to-br ${gradients[color] || gradients.indigo} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <span className="text-white/10 text-7xl font-display font-bold">{post.category?.[0]}</span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2.5">
            <Badge color={color}>{post.category}</Badge>
            <span className="text-xs text-slate-600 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}m</span>
          </div>
          <h3 className="text-sm font-display font-bold text-slate-200 mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-2 mt-4 pt-3.5 border-t border-slate-800">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
              {post.author?.[0]}
            </div>
            <span className="text-xs text-slate-600">{post.author}</span>
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

  useEffect(() => { document.title = 'Insights & Research — NexaEdge Consulting'; }, []);

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
    <main className="pt-16 bg-[#06080F]">
      {/* Hero */}
      <section className="relative bg-hero-dark py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-6">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Insights</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Insights & <span className="text-gradient">Research</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-400 max-w-2xl mb-8">
            Expert thinking on AI strategy, digital transformation, and enterprise growth from the NexaEdge research team.
          </motion.p>

          {/* Search */}
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSearch} className="flex gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 text-slate-300 placeholder:text-slate-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors text-sm">
              Search
            </button>
          </motion.form>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#06080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
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
              <p className="text-slate-500 text-lg">No articles found.</p>
              <button onClick={() => { setSearch(''); setSearchInput(''); setCategory('All'); setPage(1); }} className="mt-4 text-indigo-400 hover:underline text-sm">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {featuredPost && (
                <div className="mb-10">
                  <p className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-4">Featured Article</p>
                  <BlogCard post={featuredPost} featured />
                </div>
              )}

              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {gridPosts.map(post => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:text-slate-200 hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                        p === page
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                          : 'border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:text-slate-200 hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Eye, Calendar, ArrowLeft, Share2, Twitter, Linkedin, Link2 } from 'lucide-react';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NewsletterSection from '../components/shared/NewsletterSection';
import api from '../utils/api';

const categoryColors = {
  Strategy: 'blue', Digital: 'indigo', Leadership: 'purple',
  Finance: 'green', Operations: 'orange', Growth: 'amber',
};

const categoryGradients = {
  blue: 'from-blue-500 to-blue-700', indigo: 'from-indigo-500 to-indigo-700',
  purple: 'from-purple-500 to-purple-700', green: 'from-green-500 to-green-700',
  orange: 'from-orange-500 to-orange-700', amber: 'from-amber-500 to-amber-700',
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/blog/${slug}`)
      .then(r => {
        setPost(r.data.data);
        document.title = `${r.data.data.title} — GrowthEdge Blog`;
        return api.get('/blog', { params: { category: r.data.data.category, limit: 3 } });
      })
      .then(r => setRelated(r.data.data.posts.filter(p => p.slug !== slug).slice(0, 3)))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="pt-16 min-h-screen">
        <LoadingSpinner className="pt-40" size="lg" text="Loading article..." />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Article Not Found</h2>
          <Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  const color = categoryColors[post.category] || 'blue';
  const gradient = categoryGradients[color] || categoryGradients.blue;
  const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <main className="pt-16">
      {/* Cover */}
      <section className={`bg-gradient-to-br ${gradient} py-20`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white truncate max-w-32">{post.title}</span>
          </div>
          <Badge color={color} className="mb-4">{post.category}</Badge>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                {post.author?.[0]}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{post.author}</p>
                <p className="text-white/70 text-xs">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/70 text-sm">
              {publishDate && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{publishDate}</span>}
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} min read</span>
              <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{post.views} views</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Article */}
            <article className="lg:col-span-8">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Share */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Share this article
                  </h4>
                  <div className="flex gap-2">
                    {[
                      { Icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, label: 'Twitter' },
                      { Icon: Linkedin, href: `https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, label: 'LinkedIn' },
                    ].map(({ Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
                        <Icon className="w-4 h-4" />{label}
                      </a>
                    ))}
                    <button
                      onClick={copyLink}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                      <Link2 className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Author */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                      {post.author?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{post.author}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{post.authorRole}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    A senior consultant at GrowthEdge with deep expertise in {post.category?.toLowerCase()} and organizational transformation.
                  </p>
                </div>

                <Link to="/blog" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">More in {post.category}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(r => (
                <Link key={r._id} to={`/blog/${r.slug}`} className="group">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5 hover:shadow-md transition-all h-full">
                    <Badge color={categoryColors[r.category] || 'blue'} className="mb-2">{r.category}</Badge>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">{r.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{r.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </main>
  );
}

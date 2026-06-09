import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Eye, Calendar, ArrowLeft, Share2, Twitter, Linkedin, Link2 } from 'lucide-react';
import Badge from '../components/ui/Badge';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import NewsletterSection from '../components/shared/NewsletterSection';
import api from '../utils/api';

const categoryColors = {
  'AI & Tech': 'indigo', Strategy: 'violet', Leadership: 'rose',
  Growth: 'cyan', Data: 'emerald', Operations: 'amber',
};

const categoryGradients = {
  indigo: 'from-indigo-600 to-violet-700', violet: 'from-violet-600 to-indigo-700',
  rose: 'from-rose-600 to-pink-700', cyan: 'from-cyan-600 to-blue-700',
  emerald: 'from-emerald-600 to-cyan-700', amber: 'from-amber-600 to-orange-700',
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
        document.title = `${r.data.data.title} — NexaEdge Insights`;
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
      <main className="pt-16 min-h-screen bg-[#06080F]">
        <LoadingSpinner className="pt-40" size="lg" text="Loading article..." />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="pt-16 min-h-screen bg-[#06080F] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-2">Article Not Found</h2>
          <Link to="/blog" className="text-indigo-400 hover:underline">← Back to Insights</Link>
        </div>
      </main>
    );
  }

  const color = categoryColors[post.category] || 'indigo';
  const gradient = categoryGradients[color] || categoryGradients.indigo;
  const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <main className="pt-16 bg-[#06080F]">
      {/* Cover */}
      <section className={`bg-gradient-to-br ${gradient} py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/blog" className="hover:text-white transition-colors">Insights</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80 truncate max-w-32">{post.title}</span>
          </div>
          <Badge color={color} className="mb-4">{post.category}</Badge>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {post.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                {post.author?.[0]}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{post.author}</p>
                <p className="text-white/60 text-xs">{post.authorRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/60 text-xs">
              {publishDate && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{publishDate}</span>}
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min read</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views} views</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-[#06080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Article */}
            <article className="lg:col-span-8">
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-3">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-500 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-5">
                {/* Share */}
                <div className="bg-[#0D1117] rounded-2xl p-5 border border-slate-800">
                  <h4 className="font-display font-semibold text-slate-300 text-xs mb-4 flex items-center gap-2 uppercase tracking-wider">
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </h4>
                  <div className="flex gap-2">
                    {[
                      { Icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, label: 'Twitter' },
                      { Icon: Linkedin, href: `https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, label: 'LinkedIn' },
                    ].map(({ Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-800 text-slate-500 hover:bg-indigo-500/10 hover:text-indigo-400 hover:border-indigo-500/30 border border-slate-700 transition-all text-xs font-medium">
                        <Icon className="w-3.5 h-3.5" />{label}
                      </a>
                    ))}
                    <button
                      onClick={copyLink}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-800 text-slate-500 hover:bg-indigo-500/10 hover:text-indigo-400 border border-slate-700 hover:border-indigo-500/30 transition-all text-xs font-medium"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Author */}
                <div className="bg-[#0D1117] rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                      {post.author?.[0]}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-slate-200 text-sm">{post.author}</p>
                      <p className="text-slate-600 text-xs">{post.authorRole}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    A senior practitioner at NexaEdge with deep expertise in {post.category?.toLowerCase()} and enterprise transformation.
                  </p>
                </div>

                <Link to="/blog" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-[#06080F] border-t border-slate-800/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-display font-bold text-slate-100 mb-7">More in {post.category}</h3>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r._id} to={`/blog/${r.slug}`} className="group">
                  <div className="bg-[#0D1117] rounded-xl border border-slate-800 p-5 hover:border-indigo-500/30 transition-all h-full">
                    <Badge color={categoryColors[r.category] || 'indigo'} className="mb-2">{r.category}</Badge>
                    <h4 className="text-xs font-display font-semibold text-slate-300 group-hover:text-indigo-300 transition-colors line-clamp-2 mt-2">{r.title}</h4>
                    <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
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

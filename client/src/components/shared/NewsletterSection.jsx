import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/subscribe', { email });
      toast.success('Subscribed! Welcome to NexaEdge insights.');
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Could not subscribe at this time');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#06080F] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-cyan-900/10 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/15 border border-indigo-500/20 rounded-2xl mb-5">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
            Intelligence, Delivered Weekly
          </h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Join 12,000+ executives who get our latest thinking on AI strategy, digital transformation, and growth leadership.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-500/20"
            >
              {loading ? 'Subscribing...' : (
                <>Subscribe <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
          <p className="text-slate-600 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}

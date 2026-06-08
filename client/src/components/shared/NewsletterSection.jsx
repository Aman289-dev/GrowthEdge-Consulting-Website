import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
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
      toast.success('Subscribed! Welcome to GrowthEdge insights.');
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Could not subscribe at this time');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-blue-600 dark:bg-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Strategic Insights, Delivered Weekly
          </h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            Join 8,000+ business leaders who get our latest thinking on strategy, growth, and leadership.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? 'Subscribing...' : (
                <>Subscribe <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
          <p className="text-blue-200 text-xs mt-3">No spam. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  );
}

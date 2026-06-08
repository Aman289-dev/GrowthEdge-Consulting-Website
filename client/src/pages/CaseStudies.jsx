import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, X, TrendingUp } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import { CardSkeleton } from '../components/ui/LoadingSpinner';
import api from '../utils/api';

const tagColors = {
  Retail: 'blue', 'Financial Services': 'green', Manufacturing: 'orange',
  'Healthcare Technology': 'purple', Technology: 'indigo', SaaS: 'cyan',
  'Private Equity': 'amber', Default: 'slate',
};

function MetricCard({ label, before, after }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">{label}</p>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-500 dark:text-slate-400 line-through">{before}</span>
        <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{after}</span>
      </div>
    </div>
  );
}

function CaseStudyModal({ study, onClose }) {
  if (!study) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div>
            <Badge color={tagColors[study.industry] || 'slate'}>{study.industry}</Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{study.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Client: {study.client}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 flex-shrink-0 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">The Challenge</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{study.challenge}</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Our Solution</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{study.solution}</p>
          </div>
          {study.metrics && Object.keys(study.metrics).length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(study.metrics).map(([key, val]) => (
                  <MetricCard key={key} label={val.label} before={val.before} after={val.after} />
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Results Achieved</h3>
            <ul className="space-y-2">
              {study.results?.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CaseStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    document.title = 'Case Studies — GrowthEdge Consulting';
    api.get('/case-studies')
      .then(r => setStudies(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const industries = ['All', ...Array.from(new Set(studies.map(s => s.industry)))];
  const filtered = filter === 'All' ? studies : studies.filter(s => s.industry === filter);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Case Studies</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Client Success Stories
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-blue-200 max-w-2xl">
            Real results from real partnerships. Explore how we've helped companies transform and grow.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          {!loading && industries.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === ind
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <CardSkeleton count={4} />
          ) : filtered.length === 0 ? (
            <p className="text-center text-slate-500 py-16">No case studies found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((study, i) => (
                <motion.div
                  key={study._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelected(study)}
                >
                  {/* Card Header */}
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-700" />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <Badge color={tagColors[study.industry] || 'slate'} className="mb-2">{study.industry}</Badge>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{study.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{study.client}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                      {study.challenge}
                    </p>

                    {/* Metrics preview */}
                    {study.metrics && Object.keys(study.metrics).length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {Object.entries(study.metrics).slice(0, 2).map(([key, val]) => (
                          <div key={key} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{val.label}</p>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-slate-400 line-through">{val.before}</span>
                              <ArrowRight className="w-3 h-3 text-blue-500" />
                              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{val.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && <CaseStudyModal study={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </main>
  );
}

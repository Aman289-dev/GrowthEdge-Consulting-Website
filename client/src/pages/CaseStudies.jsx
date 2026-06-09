import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, X, TrendingUp } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import { CardSkeleton } from '../components/ui/LoadingSpinner';
import api from '../utils/api';

const tagColors = {
  Retail: 'cyan', 'Financial Services': 'emerald', Manufacturing: 'amber',
  'Healthcare Technology': 'violet', Technology: 'indigo', SaaS: 'blue',
  'Private Equity': 'rose', Default: 'slate',
};

function MetricCard({ label, before, after }) {
  return (
    <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
      <p className="text-xs text-slate-600 mb-2 font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-600 line-through">{before}</span>
        <ArrowRight className="w-3 h-3 text-indigo-500" />
        <span className="text-xs font-bold text-indigo-400">{after}</span>
      </div>
    </div>
  );
}

function CaseStudyModal({ study, onClose }) {
  if (!study) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        className="relative bg-[#0D1117] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <Badge color={tagColors[study.industry] || 'slate'}>{study.industry}</Badge>
            <h2 className="text-2xl font-display font-bold text-white mt-2">{study.title}</h2>
            <p className="text-slate-500 text-sm mt-1">Client: {study.client}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 flex-shrink-0 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-display font-semibold text-slate-200 mb-2 text-sm">The Challenge</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{study.challenge}</p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-200 mb-2 text-sm">Our Solution</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{study.solution}</p>
          </div>
          {study.metrics && Object.keys(study.metrics).length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-slate-200 mb-3 text-sm">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(study.metrics).map(([key, val]) => (
                  <MetricCard key={key} label={val.label} before={val.before} after={val.after} />
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-display font-semibold text-slate-200 mb-3 text-sm">Results Achieved</h3>
            <ul className="space-y-2">
              {study.results?.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
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
    document.title = 'Case Studies — NexaEdge Consulting';
    api.get('/case-studies')
      .then(r => setStudies(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const industries = ['All', ...Array.from(new Set(studies.map(s => s.industry)))];
  const filtered = filter === 'All' ? studies : studies.filter(s => s.industry === filter);

  return (
    <main className="pt-16 bg-[#06080F]">
      {/* Hero */}
      <section className="relative bg-hero-dark py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-6">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Case Studies</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Client <span className="text-gradient">Success Stories</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-400 max-w-2xl">
            Real transformations, real results. Explore how NexaEdge has helped enterprises across industries unlock exponential growth.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16 bg-[#06080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!loading && industries.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    filter === ind
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
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
            <p className="text-center text-slate-600 py-16">No case studies found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((study, i) => (
                <motion.div
                  key={study._id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-[#0D1117] rounded-2xl border border-slate-800 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setSelected(study)}
                >
                  <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-600" />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <Badge color={tagColors[study.industry] || 'slate'} className="mb-2">{study.industry}</Badge>
                        <h3 className="text-base font-display font-bold text-slate-100">{study.title}</h3>
                        <p className="text-slate-600 text-xs mt-1">{study.client}</p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">
                      {study.challenge}
                    </p>

                    {study.metrics && Object.keys(study.metrics).length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {Object.entries(study.metrics).slice(0, 2).map(([key, val]) => (
                          <div key={key} className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800">
                            <p className="text-xs text-slate-600 mb-1">{val.label}</p>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-slate-600 line-through">{val.before}</span>
                              <ArrowRight className="w-2.5 h-2.5 text-indigo-500" />
                              <span className="text-xs font-bold text-indigo-400">{val.after}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-medium hover:gap-2.5 transition-all duration-200">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
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

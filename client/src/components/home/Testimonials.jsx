import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import LoadingSpinner from '../ui/LoadingSpinner';
import api from '../../utils/api';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get('/testimonials')
      .then(r => setTestimonials(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = testimonials.filter(t => t.featured);
  const displayList = featured.length > 0 ? featured : testimonials;

  const prev = () => setCurrent(c => (c - 1 + displayList.length) % displayList.length);
  const next = () => setCurrent(c => (c + 1) % displayList.length);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Stories"
          title="What Our Clients Say"
          description="Don't take our word for it — hear from the leaders we've helped achieve breakthrough results."
        />

        <div className="mt-12 max-w-4xl mx-auto">
          {loading ? (
            <LoadingSpinner className="py-16" text="Loading testimonials..." />
          ) : displayList.length === 0 ? (
            <p className="text-center text-slate-500 py-12">No testimonials yet.</p>
          ) : (
            <>
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 md:p-10 shadow-sm"
                  >
                    <Quote className="w-10 h-10 text-blue-200 dark:text-blue-900 mb-6" />
                    <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8 italic">
                      "{displayList[current].text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {displayList[current].name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{displayList[current].name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {displayList[current].role}, {displayList[current].company}
                        </div>
                        <StarRating rating={displayList[current].rating} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {displayList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-slate-600'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

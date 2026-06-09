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
          className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
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
    <section className="py-24 bg-[#06080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Client Stories"
          title="Results That Speak for Themselves"
          description="Hear directly from the executives and teams we've partnered with to achieve transformational outcomes."
        />

        <div className="mt-14 max-w-3xl mx-auto">
          {loading ? (
            <LoadingSpinner className="py-16" text="Loading testimonials..." />
          ) : displayList.length === 0 ? (
            <p className="text-center text-slate-600 py-12">No testimonials yet.</p>
          ) : (
            <>
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35 }}
                    className="bg-[#0D1117] rounded-2xl border border-slate-800 p-8 md:p-10"
                  >
                    <Quote className="w-9 h-9 text-indigo-500/30 mb-6" />
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 font-light">
                      "{displayList[current].text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {displayList[current].name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 font-display">{displayList[current].name}</div>
                        <div className="text-sm text-slate-500">
                          {displayList[current].role}, {displayList[current].company}
                        </div>
                        <StarRating rating={displayList[current].rating} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-7">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-200 hover:border-slate-600 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1.5">
                  {displayList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-indigo-500' : 'w-1.5 bg-slate-700'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-200 hover:border-slate-600 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

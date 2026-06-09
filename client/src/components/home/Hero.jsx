import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, TrendingUp, Shield } from 'lucide-react';
import Button from '../ui/Button';

const badges = [
  { icon: Brain, label: 'AI-Powered Strategy', color: 'from-indigo-500 to-violet-500', delay: 0 },
  { icon: TrendingUp, label: '+380% Avg. Client ROI', color: 'from-cyan-500 to-blue-500', delay: 0.15 },
  { icon: Shield, label: '99% Retention Rate', color: 'from-emerald-500 to-cyan-500', delay: 0.3 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero({ onBookConsultation }) {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-dark">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-36">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Content */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium mb-7">
                <Sparkles className="w-3.5 h-3.5" />
                Redefining Enterprise Consulting in the AI Era
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.08] mb-7">
              Transform Your{' '}
              <span className="text-gradient">Business</span>
              {' '}with Intelligent Strategy
            </motion.h1>

            <motion.p variants={item} className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
              NexaEdge partners with forward-thinking enterprises to unlock exponential growth through AI strategy, digital transformation, and data-driven decision making.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={onBookConsultation}
              >
                Book Strategy Call
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToServices}
              >
                Explore Services
              </Button>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-4 mt-10 pt-8 border-t border-slate-800">
              <div className="flex -space-x-2">
                {['I', 'J', 'K', 'L'].map((l, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full border-2 border-[#06080F] flex items-center justify-center text-xs font-bold text-white ${
                    ['bg-indigo-600','bg-violet-600','bg-cyan-600','bg-blue-600'][i]
                  }`}>{l}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                  {'★★★★★'}
                  <span className="text-slate-300 font-normal ml-1">4.9/5 from 750+ clients</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side — floating metric cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-[420px]">
              {/* Central orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-52 h-52">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600/20 to-cyan-500/10 border border-indigo-500/20 animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-600/25 to-violet-500/15 border border-indigo-400/20" />
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {badges.map(({ icon: Icon, label, color, delay }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { delay: 0.7 + delay, duration: 0.5 },
                    scale: { delay: 0.7 + delay, duration: 0.5 },
                    y: { delay: 0.7 + delay, duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className={`absolute glass flex items-center gap-3 px-5 py-3.5 shadow-xl ${
                    i === 0 ? 'top-4 left-0' : i === 1 ? 'top-1/2 -translate-y-1/2 right-0' : 'bottom-4 left-8'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                  </div>
                  <span className="text-white font-semibold text-sm whitespace-nowrap">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06080F] to-transparent" />
    </section>
  );
}

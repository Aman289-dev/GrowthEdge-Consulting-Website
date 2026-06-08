import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, Award } from 'lucide-react';
import Button from '../ui/Button';

const floatingCards = [
  { icon: TrendingUp, label: '+243% Revenue Growth', color: 'bg-blue-600', delay: 0 },
  { icon: Users, label: '500+ Clients Served', color: 'bg-amber-500', delay: 0.2 },
  { icon: Award, label: '15 Years Experience', color: 'bg-emerald-500', delay: 0.4 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero({ onBookConsultation }) {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 dark:from-[#0F172A] dark:via-[#1E3A8A] dark:to-[#1E40AF]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Trusted by 500+ businesses worldwide
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Helping Businesses{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">Scale Faster</span>
              {' '}and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Smarter</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
              GrowthEdge Consulting partners with ambitious companies to unlock sustainable growth through strategy, innovation, and operational excellence.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={onBookConsultation}
              >
                Book a Consultation
              </Button>
              <Button
                variant="white-outline"
                size="lg"
                onClick={scrollToServices}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-80">
              {floatingCards.map(({ icon: Icon, label, color, delay }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -12, 0],
                  }}
                  transition={{
                    opacity: { delay: 0.6 + delay, duration: 0.5 },
                    scale: { delay: 0.6 + delay, duration: 0.5 },
                    y: { delay: 0.6 + delay, duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.2 },
                  }}
                  className={`absolute flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 shadow-2xl ${
                    i === 0 ? 'top-0 left-8' : i === 1 ? 'top-1/3 right-0' : 'bottom-0 left-16'
                  }`}
                >
                  <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm whitespace-nowrap">{label}</span>
                </motion.div>
              ))}

              {/* Central graphic */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 border border-blue-400/20 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-700/30 border border-blue-400/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
    </section>
  );
}

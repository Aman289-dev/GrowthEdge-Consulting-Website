import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { STATS } from '../../utils/constants';

export default function Stats() {
  return (
    <section className="py-16 bg-[#06080F] border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-800/50">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#06080F] px-6 py-10 text-center group hover:bg-slate-900/50 transition-colors"
            >
              <div className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <div className="text-slate-500 text-sm font-medium tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

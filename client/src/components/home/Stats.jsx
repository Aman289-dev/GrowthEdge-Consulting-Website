import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { STATS } from '../../utils/constants';

export default function Stats() {
  return (
    <section className="bg-slate-900 dark:bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <div className="text-slate-400 text-sm sm:text-base font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

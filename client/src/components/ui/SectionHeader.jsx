import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, description, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={center ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}
    >
      {eyebrow && (
        <span className={`inline-block text-sm font-semibold tracking-widest uppercase mb-3 ${light ? 'text-blue-300' : 'text-blue-600 dark:text-blue-400'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold mb-4 leading-tight ${light ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed ${light ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

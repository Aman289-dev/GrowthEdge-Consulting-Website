import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, description, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55 }}
      className={center ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}
    >
      {eyebrow && (
        <span className={`inline-block text-xs font-semibold tracking-widest uppercase mb-3 ${
          light ? 'text-indigo-300' : 'text-indigo-400'
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-display font-bold mb-4 leading-tight ${
        light ? 'text-white' : 'text-slate-100'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base leading-relaxed ${
          light ? 'text-slate-300' : 'text-slate-500'
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

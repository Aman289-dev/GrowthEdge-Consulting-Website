import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Zap, TrendingUp, BarChart3, Settings2, Users2, ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { SERVICES } from '../../utils/constants';

const iconMap = { Brain, Zap, TrendingUp, BarChart3, Settings2, Users2 };

const colorMap = {
  indigo: { bg: 'bg-indigo-500/10', icon: 'text-indigo-400', border: 'group-hover:border-indigo-500/40' },
  cyan:   { bg: 'bg-cyan-500/10',   icon: 'text-cyan-400',   border: 'group-hover:border-cyan-500/40' },
  violet: { bg: 'bg-violet-500/10', icon: 'text-violet-400', border: 'group-hover:border-violet-500/40' },
  emerald:{ bg: 'bg-emerald-500/10',icon: 'text-emerald-400',border: 'group-hover:border-emerald-500/40' },
  amber:  { bg: 'bg-amber-500/10',  icon: 'text-amber-400',  border: 'group-hover:border-amber-500/40' },
  rose:   { bg: 'bg-rose-500/10',   icon: 'text-rose-400',   border: 'group-hover:border-rose-500/40' },
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#06080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Do"
          title="End-to-End Transformation Services"
          description="From AI strategy to operational excellence — we deliver the expertise and execution power your enterprise needs to dominate."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || Brain;
            const colors = colorMap[service.color] || colorMap.indigo;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group bg-[#0D1117] rounded-2xl border border-slate-800 p-6 hover:bg-slate-900/60 transition-all duration-300 cursor-pointer ${colors.border}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${colors.bg}`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-base font-display font-bold text-slate-100 mb-2.5">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <Link
                  to={`/services#${service.id}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium ${colors.icon} hover:gap-2.5 transition-all duration-200`}
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

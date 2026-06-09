import { motion } from 'framer-motion';
import { CheckCircle2, Cpu } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const achievements = [
  'Named a Top 10 Global AI Consulting Firm by Gartner, 2024',
  'Recipient of the World Innovation in Business Award',
  'Strategic partner to 5 Fortune 50 enterprises',
  'ISO 27001 certified — enterprise-grade security practices',
  'Average client ROI of 380% within 18 months of engagement',
  '60+ PhDs, ex-FAANG engineers, and seasoned C-suite advisors',
];

export default function CompanyOverview() {
  return (
    <section className="py-24 bg-[#06080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="Who We Are"
              title="Where Intelligence Meets Impact"
              center={false}
            />
            <div className="mt-6 space-y-4 text-slate-400 leading-relaxed">
              <p>
                Founded in 2006, NexaEdge has spent nearly two decades at the intersection of technology and business strategy. We don't just advise — we architect transformations that redefine how enterprises compete and grow.
              </p>
              <p>
                Our approach combines the analytical rigor of top-tier management consulting with the technical depth of a world-class engineering firm. The result is strategies that are not only bold but also executable — grounded in data, AI, and deep operational expertise.
              </p>
              <p>
                Our 60-person core team includes AI researchers, former CTOs, growth engineers, and organizational psychologists. We've deployed over 400 digital transformation programs across 30+ industries on six continents. Every engagement is staffed with senior practitioners — no junior-heavy pyramids.
              </p>
            </div>
          </motion.div>

          {/* Visual + Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Graphic */}
            <div className="relative rounded-2xl overflow-hidden h-52 mb-8 bg-gradient-to-br from-indigo-900/60 to-violet-900/40 border border-indigo-500/20 flex items-center justify-center">
              <Cpu className="w-28 h-28 text-indigo-500/15 absolute" />
              <div className="relative text-center">
                <div className="text-6xl font-display font-bold text-gradient mb-1">18+</div>
                <div className="text-slate-400 text-base font-medium">Years of Innovation</div>
              </div>
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-indigo-500/40 rounded-tl-lg" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40 rounded-br-lg" />
            </div>

            <ul className="space-y-3">
              {achievements.map((achv, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 text-indigo-400 flex-shrink-0 mt-0.5 w-[18px] h-[18px]" />
                  <span className="text-slate-400 text-sm">{achv}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

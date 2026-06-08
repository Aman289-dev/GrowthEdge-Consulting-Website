import { motion } from 'framer-motion';
import { CheckCircle, BarChart2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const achievements = [
  'Featured in Forbes, Harvard Business Review, and McKinsey Quarterly',
  'Recipient of the 2023 Global Consulting Excellence Award',
  'Certified by the International Institute of Business Analysis',
  'ISO 9001:2015 Certified for Quality Management',
  'Strategic partner to 3 of the Global Fortune 100 companies',
  'Average client ROI of 380% within 18 months of engagement',
];

export default function CompanyOverview() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
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
              title="A Different Kind of Consulting Firm"
              center={false}
            />
            <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Founded in 2009, GrowthEdge Consulting has spent 15 years building one of the most respected strategic advisory practices in North America. We work with ambitious leaders who want to make meaningful, lasting change — not just generate recommendations.
              </p>
              <p>
                What sets us apart is our commitment to execution. We don't just hand over a strategy document and disappear. We embed our consultants within your organization, working alongside your team to ensure that strategy becomes reality and insights translate into measurable results.
              </p>
              <p>
                Our 45-person core team brings together former C-suite executives, industry veterans, and functional specialists across every domain of business. This collective experience spans retail, financial services, technology, healthcare, manufacturing, and more than a dozen other industries.
              </p>
              <p>
                We believe that great consulting leaves organizations permanently stronger. Every engagement is designed to build internal capabilities, not create dependency. When we're done, your team should be able to maintain and extend the gains we've achieved together.
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
            {/* Graphic placeholder */}
            <div className="relative rounded-2xl overflow-hidden h-48 mb-8 bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
              <BarChart2 className="w-24 h-24 text-white/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-extrabold text-white">15+</div>
                  <div className="text-blue-200 text-lg font-medium">Years of Excellence</div>
                </div>
              </div>
            </div>

            <ul className="space-y-3">
              {achievements.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

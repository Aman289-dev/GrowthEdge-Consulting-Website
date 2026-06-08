import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Zap, Search, TrendingUp, Settings, Users, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { SERVICES } from '../utils/constants';

const iconMap = { Target, Zap, Search, TrendingUp, Settings, Users };

const colorBgMap = {
  blue: 'from-blue-500 to-blue-700',
  indigo: 'from-indigo-500 to-indigo-700',
  cyan: 'from-cyan-500 to-cyan-700',
  green: 'from-green-500 to-green-700',
  orange: 'from-orange-500 to-orange-700',
  purple: 'from-purple-500 to-purple-700',
};

const serviceDescriptions = {
  'business-strategy': [
    'Every great business starts with a clear strategy. At GrowthEdge, we help you develop strategies that are both ambitious and executable—grounded in deep analysis of your market, competitive position, and internal capabilities.',
    'We work with leadership teams to make the hard choices that strategy requires: where to play, how to win, and how to allocate finite resources for maximum impact. The result is a strategic plan that your entire organization can rally behind.',
  ],
  'digital-transformation': [
    'Digital transformation is not a technology project—it\'s a business transformation enabled by technology. We help organizations modernize their operations, enhance customer experiences, and build digital capabilities that create lasting competitive advantage.',
    'Our approach starts with business outcomes and works backward to the technology and process changes required. We manage the full transformation: strategy, technology selection, implementation, and change management.',
  ],
  'market-research': [
    'Confident strategic decisions require deep market intelligence. Our market research practice combines quantitative analysis with qualitative insight to give you a genuinely three-dimensional view of your market.',
    'We go beyond secondary research to develop primary insights through customer interviews, competitive intelligence, and proprietary analytical frameworks. The result is market understanding that translates directly into better strategic choices.',
  ],
  'financial-planning': [
    'Financial planning that\'s aligned with your strategy and built for the pace at which business now moves. We help organizations replace rigid annual budgets with more dynamic planning approaches that support strategic agility.',
    'From integrated business planning to sophisticated scenario modeling, we build the financial planning capabilities your organization needs to allocate resources confidently and respond quickly to changing conditions.',
  ],
  'operational-excellence': [
    'Operational excellence is the foundation that sustainable growth is built on. Without the ability to deliver consistently, efficiently, and at scale, even the best strategy will underperform.',
    'Our operational excellence programs are grounded in lean principles but adapted to your specific context. We don\'t just optimize processes—we build the management systems, measurement frameworks, and culture of continuous improvement that make gains permanent.',
  ],
  'leadership-development': [
    'The quality of your leadership team is the single biggest predictor of long-term organizational success. We help organizations build the leadership capabilities their strategy requires.',
    'Our approach combines rigorous assessment with experiential development. We don\'t just teach leadership—we design programs that put leaders in real situations where they must develop and demonstrate new capabilities.',
  ],
};

const steps = [
  { num: 1, title: 'Discovery', desc: 'We invest time upfront to deeply understand your business, challenges, competitive context, and strategic goals.' },
  { num: 2, title: 'Strategy', desc: 'Working collaboratively with your team, we develop tailored recommendations and a clear roadmap for execution.' },
  { num: 3, title: 'Execution', desc: 'We provide hands-on implementation support, working alongside your team to turn strategy into reality.' },
  { num: 4, title: 'Growth', desc: 'We measure results, optimize the approach, and help you build the capabilities to sustain growth independently.' },
];

export default function ServicesPage({ onBookConsultation }) {
  useEffect(() => { document.title = 'Services — GrowthEdge Consulting'; }, []);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Services</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Our Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-blue-200 max-w-2xl">
            End-to-end consulting services designed to accelerate your growth and build lasting organizational capability.
          </motion.p>
        </div>
      </section>

      {/* Service Sections */}
      {SERVICES.map((service, i) => {
        const Icon = iconMap[service.icon] || Target;
        const gradient = colorBgMap[service.color];
        const desc = serviceDescriptions[service.id] || ['', ''];
        const isEven = i % 2 === 0;

        return (
          <section key={service.id} id={service.id} className={`py-20 ${isEven ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-900/50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-16 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h2>
                  <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {desc.map((p, pi) => <p key={pi}>{p}</p>)}
                  </div>
                  <Link to="/contact">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-8 shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-5 text-sm uppercase tracking-wider">What We Deliver</h4>
                    <ul className="space-y-3">
                      {service.deliverables.map((d, di) => (
                        <motion.li
                          key={di}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: di * 0.08 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 dark:text-slate-300 text-sm">{d}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Process */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How We Work" title="Our Engagement Process" description="A proven four-phase approach that delivers results every time." light />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent" />
                )}
                <div className="relative w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl mx-auto mb-4 z-10">
                  {num}
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button
              onClick={onBookConsultation}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg"
            >
              Book Your Free Consultation <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

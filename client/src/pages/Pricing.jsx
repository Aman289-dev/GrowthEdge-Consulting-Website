import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, Zap, ArrowRight, Star } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import FAQSection from '../components/shared/FAQSection';
import { PRICING_PLANS } from '../utils/constants';

const colorMap = {
  cyan:   { border: 'border-cyan-500/30 hover:border-cyan-500/50', badge: 'bg-cyan-500/10 text-cyan-400', cta: 'bg-cyan-500 hover:bg-cyan-400 text-slate-900', check: 'text-cyan-400', glow: 'shadow-cyan-500/10' },
  indigo: { border: 'border-indigo-500/40 hover:border-indigo-500/60', badge: 'bg-indigo-500/10 text-indigo-400', cta: 'bg-indigo-600 hover:bg-indigo-500 text-white', check: 'text-indigo-400', glow: 'shadow-indigo-500/15' },
  violet: { border: 'border-violet-500/30 hover:border-violet-500/50', badge: 'bg-violet-500/10 text-violet-400', cta: 'bg-violet-600 hover:bg-violet-500 text-white', check: 'text-violet-400', glow: 'shadow-violet-500/10' },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

export default function Pricing({ onBookConsultation }) {
  useEffect(() => { document.title = 'Pricing — NexaEdge Consulting'; }, []);

  return (
    <main className="pt-16 bg-[#06080F]">
      {/* Hero */}
      <section className="relative bg-hero-dark py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-6 justify-center">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Pricing</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-display font-bold text-white mb-4"
          >
            Transparent, <span className="text-gradient">Value-Driven</span> Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Three engagement models designed to match the scale of your ambition. Every engagement starts with a complimentary strategy session.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-[#06080F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PRICING_PLANS.map((plan) => {
              const colors = colorMap[plan.color] || colorMap.indigo;
              return (
                <motion.div
                  key={plan.id}
                  variants={item}
                  className={`relative bg-[#0D1117] rounded-2xl border ${colors.border} p-7 flex flex-col transition-all duration-300 ${
                    plan.popular ? `shadow-xl ${colors.glow}` : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-indigo-500/30">
                        <Star className="w-3 h-3 fill-white" /> Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge} mb-4`}>
                      {plan.name}
                    </span>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                      <span className="text-slate-600 text-sm">/ {plan.period}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 ${colors.check} flex-shrink-0 mt-0.5`} />
                        <span className="text-slate-400 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={onBookConsultation}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${colors.cta}`}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-slate-600 text-sm mt-8"
          >
            All engagements begin with a complimentary 45-minute strategy session. No commitment required.
          </motion.p>
        </div>
      </section>

      {/* Why NexaEdge */}
      <section className="py-20 bg-[#06080F] border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Choose NexaEdge"
            title="What Sets Our Engagements Apart"
            description="We don't just deliver strategy — we deliver transformation. Here's what every NexaEdge engagement includes."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🎯', title: 'Senior-Only Teams', desc: 'No bait-and-switch. Every engagement is staffed exclusively with senior practitioners — no inexperienced associates in disguise.' },
              { icon: '📊', title: 'Outcome-Based Pricing', desc: 'For qualifying engagements, we offer success-based fee structures where our compensation is tied to the results we achieve together.' },
              { icon: '⚡', title: 'Rapid Time-to-Value', desc: 'We identify and deliver quick wins within the first 30 days of every engagement so you see ROI long before the final deliverable.' },
              { icon: '🔒', title: 'Full Confidentiality', desc: 'Enterprise-grade NDA from day one. Your strategies, data, and intellectual property are protected with the highest security standards.' },
              { icon: '🌐', title: 'Global Capability', desc: 'We operate across 20+ countries with practitioners fluent in the cultural, regulatory, and competitive dynamics of each market.' },
              { icon: '🔄', title: 'Post-Engagement Support', desc: 'All engagements include a structured 90-day post-delivery support window to ensure your team is set up for sustained success.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-[#0D1117] rounded-2xl border border-slate-800 p-6 hover:border-slate-700 transition-all"
              >
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-display font-bold text-slate-100 mb-2 text-sm">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#06080F] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-indigo-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="w-10 h-10 text-indigo-400 mx-auto mb-5" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Not Sure Which Plan Fits?
            </h2>
            <p className="text-slate-500 mb-8 text-sm leading-relaxed max-w-lg mx-auto">
              Book a 45-minute discovery call. We'll review your goals and recommend the engagement model that will generate the best return on your investment.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={onBookConsultation}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-xl shadow-indigo-500/20"
              >
                Book Free Discovery Call <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600 font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                Send a Message
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

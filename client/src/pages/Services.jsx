import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Zap, TrendingUp, BarChart3, Settings2, Users2, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { SERVICES } from '../utils/constants';

const iconMap = { Brain, Zap, TrendingUp, BarChart3, Settings2, Users2 };

const colorMap = {
  indigo: { gradient: 'from-indigo-500 to-violet-500', icon: 'text-indigo-400', check: 'text-indigo-400' },
  cyan:   { gradient: 'from-cyan-500 to-blue-500',    icon: 'text-cyan-400',   check: 'text-cyan-400' },
  violet: { gradient: 'from-violet-500 to-indigo-500',icon: 'text-violet-400', check: 'text-violet-400' },
  emerald:{ gradient: 'from-emerald-500 to-cyan-500', icon: 'text-emerald-400',check: 'text-emerald-400' },
  amber:  { gradient: 'from-amber-500 to-orange-500', icon: 'text-amber-400',  check: 'text-amber-400' },
  rose:   { gradient: 'from-rose-500 to-pink-500',    icon: 'text-rose-400',   check: 'text-rose-400' },
};

const serviceDescriptions = {
  'ai-strategy': [
    'The AI revolution is not coming — it\'s here. NexaEdge helps enterprises move from AI curiosity to AI mastery. We design comprehensive strategies that embed machine intelligence into your core business processes, competitive positioning, and decision-making architecture.',
    'Our AI Strategy practice combines deep technical expertise with rigorous business analysis. We don\'t just identify use cases — we build AI-ready organizations with the governance, data infrastructure, and talent capabilities to sustain and compound AI advantages over time.',
  ],
  'digital-transformation': [
    'True digital transformation is not a technology upgrade — it\'s a fundamental reimagining of how your business creates and captures value. NexaEdge delivers end-to-end transformations that modernize your technology stack while simultaneously reinventing the business models and processes that drive competitive advantage.',
    'We manage the full complexity of transformation: technology selection, cloud architecture, legacy migration, process redesign, and the change management required to make it all stick. Our track record spans 400+ digital transformations across every major industry.',
  ],
  'growth-acceleration': [
    'Growth that\'s fast but unsustainable is not growth — it\'s risk. NexaEdge\'s Growth Acceleration practice combines the analytical rigor of management consulting with the execution precision of a growth engineering firm to build your path to exponential, repeatable revenue expansion.',
    'We work across the full growth equation: product-market fit validation, go-to-market optimization, channel strategy, pricing models, and customer lifetime value engineering. Every recommendation is rooted in your specific data and market dynamics.',
  ],
  'data-intelligence': [
    'Most enterprises are data-rich and insight-poor. NexaEdge transforms raw data into competitive intelligence by building robust analytics ecosystems that surface actionable signals and power confident decisions at every organizational level.',
    'From data architecture design to predictive modeling and real-time dashboards, we build data capabilities that outlast the engagement. Our Data Intelligence practice has helped clients reduce decision latency by 60% and identify revenue opportunities that were previously invisible.',
  ],
  'operational-excellence': [
    'The best strategy in the world underperforms without the operational foundation to execute it. NexaEdge\'s Operational Excellence practice builds the systems, processes, and culture of continuous improvement that turn strategic intent into consistent results.',
    'We go beyond lean toolkits and process maps. We redesign operating models, implement intelligent automation, and embed performance management disciplines that create durable operational advantages—organizations that get better every quarter, not just for the life of the engagement.',
  ],
  'leadership-transformation': [
    'The single most powerful predictor of organizational success is the quality of leadership at every level. NexaEdge\'s Leadership Transformation practice builds the next generation of visionary executives and high-performance teams your strategy demands.',
    'Our approach combines rigorous competency assessment with immersive, context-specific development programs. We design experiences that stretch leaders in real situations — building judgment, adaptability, and the psychological safety required for breakthrough performance.',
  ],
};

const steps = [
  { num: '01', title: 'Diagnose', desc: 'We conduct a deep-dive into your business landscape, competitive dynamics, data, and organizational capabilities to identify the highest-value opportunities.' },
  { num: '02', title: 'Design', desc: 'Working alongside your leadership team, we co-create tailored strategies, detailed roadmaps, and clear success metrics with complete stakeholder alignment.' },
  { num: '03', title: 'Deploy', desc: 'Our senior practitioners embed with your team to drive execution — from technology implementation to organizational change management.' },
  { num: '04', title: 'Scale', desc: 'We measure outcomes rigorously, optimize continuously, and transfer capabilities to ensure your organization sustains and compounds its competitive advantages.' },
];

export default function ServicesPage({ onBookConsultation }) {
  useEffect(() => { document.title = 'Services — NexaEdge Consulting'; }, []);

  return (
    <main className="pt-16 bg-[#06080F]">
      {/* Hero */}
      <section className="relative bg-hero-dark py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-6">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Services</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Our <span className="text-gradient">Services</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-400 max-w-2xl">
            Six practice areas built to deliver transformational impact across every dimension of enterprise performance.
          </motion.p>
        </div>
      </section>

      {/* Service Sections */}
      {SERVICES.map((service, i) => {
        const Icon = iconMap[service.icon] || Brain;
        const colors = colorMap[service.color] || colorMap.indigo;
        const desc = serviceDescriptions[service.id] || ['', ''];
        const isEven = i % 2 === 0;

        return (
          <section key={service.id} id={service.id} className="py-20 bg-[#06080F] border-t border-slate-800/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-14 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className={!isEven ? 'lg:col-start-2' : ''}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-6 shadow-xl`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">{service.title}</h2>
                  <div className="space-y-4 text-slate-500 leading-relaxed mb-8 text-sm">
                    {desc.map((p, pi) => <p key={pi}>{p}</p>)}
                  </div>
                  <Link to="/contact">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-lg shadow-indigo-500/20">
                      Start This Engagement <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.15 }}
                  className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}
                >
                  <div className="bg-[#0D1117] rounded-2xl border border-slate-800 p-7">
                    <h4 className="font-display font-semibold text-slate-300 mb-5 text-xs uppercase tracking-widest">What We Deliver</h4>
                    <ul className="space-y-3">
                      {service.deliverables.map((d, di) => (
                        <motion.li
                          key={di}
                          initial={{ opacity: 0, x: 16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: di * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className={`w-4 h-4 ${colors.check} flex-shrink-0 mt-0.5`} />
                          <span className="text-slate-400 text-sm">{d}</span>
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
      <section className="py-24 bg-[#06080F] border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="How We Work" title="Our Engagement Methodology" description="A four-phase approach engineered for maximum speed, alignment, and measurable impact." />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center group"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-3/4 w-1/2 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
                )}
                <div className="relative w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center text-white font-display font-bold text-lg mx-auto mb-5 z-10 shadow-xl shadow-indigo-500/20">
                  {num}
                </div>
                <h3 className="font-display font-bold text-slate-100 mb-2 text-sm">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <button
              onClick={onBookConsultation}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 text-base shadow-xl shadow-indigo-500/20"
            >
              Book Your Free Strategy Session <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Linkedin, Zap, Eye, Award, Handshake, Target, Shield } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { STATS } from '../utils/constants';

const timeline = [
  { year: '2006', event: 'Founded in NYC', desc: 'NexaEdge was founded by Dr. Aria Patel with a bold vision: to build the world\'s most technologically advanced consulting practice.' },
  { year: '2010', event: 'First 50 Enterprises', desc: 'Reached 50 enterprise clients. Launched dedicated Technology Strategy practice, ahead of the cloud revolution.' },
  { year: '2014', event: 'Global Expansion', desc: 'Opened innovation hubs in London, Singapore, and Toronto. Grew core team to 30 senior practitioners.' },
  { year: '2018', event: 'AI Practice Launch', desc: 'Became one of the first consulting firms globally to build a dedicated AI & Machine Learning Strategy practice.' },
  { year: '2021', event: '$3B Value Milestone', desc: 'Surpassed $3B in cumulative enterprise value created for clients through NexaEdge-led transformations.' },
  { year: '2025', event: '750+ Transformations', desc: 'Celebrating 750+ successful enterprise engagements and launching next-gen AI-augmented strategy platform.' },
];

const values = [
  { icon: Shield, title: 'Integrity First', desc: 'We give you the truth, even when it\'s uncomfortable. Our clients trust us because we have never compromised on honest counsel.', color: 'text-indigo-400 bg-indigo-500/10' },
  { icon: Zap, title: 'Radical Innovation', desc: 'We constantly challenge convention. Our research and methodologies are years ahead of standard consulting approaches.', color: 'text-cyan-400 bg-cyan-500/10' },
  { icon: Award, title: 'Uncompromising Excellence', desc: 'Good is never good enough. Every deliverable, every insight, every engagement is held to the highest possible standard.', color: 'text-amber-400 bg-amber-500/10' },
  { icon: Handshake, title: 'True Partnership', desc: 'We succeed when our clients succeed. Every engagement is a genuine partnership — we share the risk and the reward.', color: 'text-emerald-400 bg-emerald-500/10' },
  { icon: Target, title: 'Outcome Obsession', desc: 'We measure ourselves by results, not deliverables. Strategy without execution is just theory — we deliver tangible impact.', color: 'text-violet-400 bg-violet-500/10' },
  { icon: Eye, title: 'Full Transparency', desc: 'No hidden agendas, no opaque pricing, no surprises. Our clients always know exactly what we\'re doing and why.', color: 'text-rose-400 bg-rose-500/10' },
];

const team = [
  { name: 'Dr. Aria Patel', role: 'CEO & Founder', initials: 'AP', color: 'from-indigo-500 to-violet-600' },
  { name: 'Marcus Chen', role: 'CTO & Co-Founder', initials: 'MC', color: 'from-cyan-500 to-blue-600' },
  { name: 'Sofia Reyes', role: 'Chief Strategy Officer', initials: 'SR', color: 'from-violet-500 to-indigo-600' },
  { name: 'James Okonkwo', role: 'Head of AI Practice', initials: 'JO', color: 'from-emerald-500 to-cyan-600' },
  { name: 'Priya Sharma', role: 'Growth Director', initials: 'PS', color: 'from-amber-500 to-orange-600' },
  { name: 'Daniel Kim', role: 'Data Intelligence Lead', initials: 'DK', color: 'from-blue-500 to-indigo-600' },
  { name: 'Emma Walsh', role: 'Operations Director', initials: 'EW', color: 'from-rose-500 to-pink-600' },
  { name: 'Luca Moretti', role: 'Client Success Lead', initials: 'LM', color: 'from-teal-500 to-emerald-600' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function About({ onBookConsultation }) {
  useEffect(() => { document.title = 'About NexaEdge — AI-Powered Consulting Firm'; }, []);

  return (
    <main className="pt-16 bg-[#06080F]">
      {/* Hero */}
      <section className="relative bg-hero-dark py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-6">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">About</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-display font-bold text-white mb-4"
          >
            About <span className="text-gradient">NexaEdge</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl"
          >
            18 years at the intersection of technology and business strategy. Building tomorrow's enterprises, today.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#06080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Purpose" title="Mission & Vision" />
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {[
              {
                label: 'Our Mission',
                title: 'Intelligence That Drives Growth',
                text: 'To empower forward-thinking enterprises with the AI-powered strategy, digital capabilities, and organizational intelligence needed to achieve exponential, sustainable growth. We partner with leaders who believe their best chapter is still unwritten.',
                gradient: 'from-indigo-500 to-violet-500',
              },
              {
                label: 'Our Vision',
                title: 'The World\'s Most Trusted Transformation Partner',
                text: 'To be the global benchmark for enterprise transformation — recognized not for the decks we produce, but for the breakthroughs we enable and the lasting competitive advantages we build for every organization we touch.',
                gradient: 'from-cyan-500 to-blue-500',
              },
            ].map(({ label, title, text, gradient }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-[#0D1117] rounded-2xl border border-slate-800 overflow-hidden"
              >
                <div className={`h-1 bg-gradient-to-r ${gradient}`} />
                <div className="p-8">
                  <span className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-3 block">{label}</span>
                  <h3 className="text-xl font-display font-bold text-white mb-4">{title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#06080F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Journey" title="The NexaEdge Story" />
          <div className="mt-12 relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-slate-800 transform sm:-translate-x-px" />
            <div className="space-y-8">
              {timeline.map((tl, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-[#06080F] transform sm:-translate-x-1.5 mt-2 z-10 shadow-lg shadow-indigo-500/40" />
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className="bg-[#0D1117] rounded-xl border border-slate-800 p-5">
                      <span className="text-indigo-400 font-bold text-base font-display">{tl.year}</span>
                      <h4 className="font-semibold text-slate-100 mt-1 text-sm">{tl.event}</h4>
                      <p className="text-slate-500 text-xs mt-2 leading-relaxed">{tl.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#06080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What We Stand For" title="Our Core Values" />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {values.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={i}
                variants={item}
                className="bg-[#0D1117] rounded-2xl border border-slate-800 p-6 hover:border-slate-700 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-slate-100 mb-2 text-sm">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-[#06080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our People"
            title="Meet the Leadership Team"
            description="Senior practitioners, AI researchers, and industry veterans who've shaped the world's most innovative enterprises."
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {team.map(({ name, role, initials, color }, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -4 }}
                className="bg-[#0D1117] rounded-2xl border border-slate-800 p-6 text-center transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-4`}>
                  {initials}
                </div>
                <h4 className="font-display font-semibold text-slate-200 text-sm">{name}</h4>
                <p className="text-slate-600 text-xs mt-1">{role}</p>
                <a href="#" className="inline-flex items-center justify-center w-7 h-7 bg-indigo-500/10 rounded-lg mt-3 text-indigo-400 hover:bg-indigo-500/20 transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#06080F] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold text-gradient mb-2">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                </div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

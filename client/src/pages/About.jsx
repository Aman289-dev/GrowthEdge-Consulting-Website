import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Linkedin, Heart, Lightbulb, Award, Handshake, Target, Eye } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { STATS } from '../utils/constants';

const timeline = [
  { year: '2009', event: 'Founded', desc: 'GrowthEdge was founded by Dr. James Okafor with a vision to make enterprise-quality strategy accessible to ambitious mid-market companies.' },
  { year: '2012', event: 'First 100 Clients', desc: 'Reached the milestone of 100 satisfied clients across retail, finance, and professional services. Expanded team to 15 consultants.' },
  { year: '2015', event: 'Expanded to Digital', desc: 'Launched dedicated Digital Transformation practice to help clients navigate the accelerating shift to digital-first business models.' },
  { year: '2018', event: 'Global Reach', desc: 'Opened offices in London and Singapore. Now serving clients across 18 countries with a team of 35 consultants.' },
  { year: '2021', event: '$1B Revenue Milestone', desc: 'Reached the milestone of $1 billion in cumulative client revenue generated through GrowthEdge engagements.' },
  { year: '2024', event: '500+ Clients', desc: 'Celebrating 500+ clients served and launching new AI-augmented strategy capabilities to deliver even greater value.' },
];

const values = [
  { icon: Heart, title: 'Integrity', desc: 'We say what we mean and do what we say. Our clients trust us because we\'ve earned it over 15 years of honest counsel.', color: 'text-red-500 bg-red-50 dark:bg-red-900/30' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We constantly challenge conventional thinking and bring fresh perspectives that create genuine competitive advantage.', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30' },
  { icon: Award, title: 'Excellence', desc: 'Average is never good enough. We hold ourselves to the highest standards in everything we do.', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30' },
  { icon: Handshake, title: 'Partnership', desc: 'We succeed when our clients succeed. Every engagement is a genuine partnership, not a vendor relationship.', color: 'text-green-500 bg-green-50 dark:bg-green-900/30' },
  { icon: Target, title: 'Impact', desc: 'We\'re not satisfied with recommendations—we measure ourselves by the actual business results we help create.', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30' },
  { icon: Eye, title: 'Transparency', desc: 'We communicate clearly and honestly, even when the message is difficult. Our clients always know exactly where they stand.', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' },
];

const team = [
  { name: 'Dr. James Okafor', role: 'CEO & Founder', initials: 'JO', color: 'from-blue-600 to-blue-800' },
  { name: 'Sarah Chen', role: 'COO', initials: 'SC', color: 'from-purple-600 to-purple-800' },
  { name: 'Michael Harrison', role: 'Strategy Director', initials: 'MH', color: 'from-indigo-600 to-indigo-800' },
  { name: 'Rachel Torres', role: 'Digital Lead', initials: 'RT', color: 'from-cyan-600 to-cyan-800' },
  { name: 'Amanda Rodriguez', role: 'Finance Director', initials: 'AR', color: 'from-green-600 to-green-800' },
  { name: 'David Park', role: 'Operations Head', initials: 'DP', color: 'from-orange-600 to-orange-800' },
  { name: 'Lisa Thompson', role: 'Marketing Lead', initials: 'LT', color: 'from-pink-600 to-pink-800' },
  { name: 'Kevin Walsh', role: 'HR Director', initials: 'KW', color: 'from-teal-600 to-teal-800' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function About({ onBookConsultation }) {
  useEffect(() => { document.title = 'About Us — GrowthEdge Consulting'; }, []);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">About</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          >
            About GrowthEdge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-200 max-w-2xl"
          >
            15 years of helping ambitious leaders build businesses that matter.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Purpose" title="Mission & Vision" />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {[
              {
                label: 'Our Mission',
                title: 'Empowering Strategic Clarity',
                text: 'To empower businesses with strategic clarity, operational excellence, and the confidence to pursue bold growth. We partner with leaders who believe the best version of their company is still ahead, and we do the hard work required to get them there.',
                gradient: 'from-blue-500 to-blue-700',
              },
              {
                label: 'Our Vision',
                title: 'The Most Trusted Growth Partner',
                text: 'To be the most trusted growth partner for ambitious businesses globally — known not for the strategy decks we produce, but for the transformations we enable and the lasting capabilities we build in every organization we touch.',
                gradient: 'from-amber-500 to-amber-700',
              },
            ].map(({ label, title, text, gradient }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm"
              >
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                <div className="p-8">
                  <span className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-3 block">{label}</span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Journey" title="The GrowthEdge Story" />
          <div className="mt-12 relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform sm:-translate-x-px" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                >
                  <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-slate-900 transform sm:-translate-x-1.5 mt-2 z-10" />
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">{item.year}</span>
                      <h4 className="font-bold text-slate-900 dark:text-white mt-1">{item.event}</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What We Stand For" title="Our Core Values" />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={i}
                variants={item}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our People" title="Meet the Leadership Team" description="Experienced leaders with deep expertise across strategy, operations, technology, and finance." />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {team.map(({ name, role, initials, color }, i) => (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm text-center transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}>
                  {initials}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{name}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{role}</p>
                <a href="#" className="inline-flex items-center justify-center w-7 h-7 bg-blue-100 dark:bg-blue-900/40 rounded-lg mt-3 text-blue-600 dark:text-blue-400 hover:bg-blue-200 transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900 dark:bg-slate-950">
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
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                </div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

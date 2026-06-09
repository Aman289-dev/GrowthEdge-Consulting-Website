import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import { FAQ_ITEMS } from '../../utils/constants';

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${
      isOpen ? 'border-indigo-500/30 bg-slate-900/60' : 'border-slate-800 bg-[#0D1117] hover:border-slate-700'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
      >
        <span className="font-medium text-slate-200 pr-4 text-sm leading-relaxed">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 0 : 0 }}
          className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center"
        >
          {isOpen
            ? <Minus className="w-3.5 h-3.5 text-indigo-400" />
            : <Plus className="w-3.5 h-3.5 text-slate-500" />
          }
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-[#06080F]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with NexaEdge."
        />
        <div className="mt-10 space-y-2.5">
          {FAQ_ITEMS.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

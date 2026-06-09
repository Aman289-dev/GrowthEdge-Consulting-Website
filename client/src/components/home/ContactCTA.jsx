import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function ContactCTA({ onBookConsultation }) {
  return (
    <section className="py-24 bg-[#06080F] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Limited Spots Available — Q3 2026
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Ready to Build Your{' '}
            <span className="text-gradient">Competitive Edge?</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 750+ enterprises that trusted NexaEdge to transform their strategy into measurable results. Your first session is complimentary — no commitments, just clarity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={onBookConsultation}
            >
              Book Strategy Call
            </Button>
            <Link to="/contact">
              <Button variant="secondary" size="lg" icon={MessageSquare} iconPosition="left">
                Send a Message
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

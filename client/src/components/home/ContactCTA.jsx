import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function ContactCTA({ onBookConsultation }) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-10">
            Let's discuss how GrowthEdge can help you achieve breakthrough results. Our first conversation is always free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="white"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={onBookConsultation}
            >
              Book a Consultation
            </Button>
            <Link to="/contact">
              <Button variant="white-outline" size="lg" icon={Phone} iconPosition="left">
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

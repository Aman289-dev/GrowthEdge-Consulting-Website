import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, Linkedin, Twitter, Github, Youtube, Send, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import FAQSection from '../components/shared/FAQSection';
import api from '../utils/api';
import { SERVICE_OPTIONS, CONTACT_INFO } from '../utils/constants';

const inputClass = 'w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-colors';
const labelClass = 'block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = 'Contact NexaEdge — Start Your Transformation'; }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message received! We\'ll respond within 4 business hours.');
      setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-16 bg-[#06080F]">
      {/* Hero */}
      <section className="relative bg-hero-dark py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-600 text-sm mb-6">
            <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Contact</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Let's <span className="text-gradient">Talk Strategy</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-slate-400 max-w-xl">
            Ready to unlock your enterprise's full potential? Our team responds within 4 hours during business days.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-[#06080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-14">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-3"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Send a Message</h2>
                <p className="text-slate-500 text-sm">We respond to all inquiries within 4 business hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Alex Johnson" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Work Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="alex@company.com" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (888) 000-0000" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Company</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Your company" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Area of Interest</label>
                  <select name="service" value={form.service} onChange={handleChange} className={`${inputClass} appearance-none`}>
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us about your business challenge and what you're hoping to achieve..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <Button type="submit" loading={loading} size="lg" icon={Send} iconPosition="right">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h3 className="text-lg font-display font-bold text-white mb-5">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { Icon: MapPin, label: 'Address', value: CONTACT_INFO.address },
                    { Icon: Phone, label: 'Phone', value: CONTACT_INFO.phone },
                    { Icon: Mail, label: 'Email', value: CONTACT_INFO.email },
                    { Icon: Clock, label: 'Business Hours', value: CONTACT_INFO.hours },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex gap-3.5">
                      <div className="w-9 h-9 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-medium uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-slate-400 text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-44 bg-[#0D1117] border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />
                <div className="relative text-center">
                  <div className="w-10 h-10 bg-indigo-500/15 border border-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                  </div>
                  <p className="text-slate-400 text-sm font-medium">350 Fifth Avenue</p>
                  <p className="text-slate-600 text-xs">New York, NY 10118</p>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Connect With Us</p>
                <div className="flex gap-2">
                  {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-indigo-500/10 text-slate-500 hover:text-indigo-400 rounded-lg flex items-center justify-center transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick response badge */}
              <div className="bg-[#0D1117] border border-slate-800 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs font-semibold">Lightning-Fast Response</p>
                  <p className="text-slate-600 text-xs">We reply within 4 hours on business days</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

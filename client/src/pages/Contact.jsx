import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, Linkedin, Twitter, Facebook, Instagram, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import FAQSection from '../components/shared/FAQSection';
import api from '../utils/api';
import { SERVICE_OPTIONS, CONTACT_INFO } from '../utils/constants';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = 'Contact — GrowthEdge Consulting'; }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      toast.success('Message sent! We\'ll be in touch within 1 business day.');
      setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-colors";

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Contact</span>
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Get in Touch
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-blue-200 max-w-xl">
            Ready to start a conversation about your business challenges? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send Us a Message</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">We respond to all inquiries within one business day.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@company.com" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Your company name" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Service of Interest</label>
                  <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us about your business challenge and what you're hoping to achieve..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <Button type="submit" loading={loading} size="lg" icon={Send} iconPosition="right" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { Icon: MapPin, label: 'Address', value: CONTACT_INFO.address },
                    { Icon: Phone, label: 'Phone', value: CONTACT_INFO.phone },
                    { Icon: Mail, label: 'Email', value: CONTACT_INFO.email },
                    { Icon: Clock, label: 'Business Hours', value: CONTACT_INFO.hours },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">123 Business Ave</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">New York, NY 10001</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,0,0,0.03) 30px, rgba(0,0,0,0.03) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.03) 30px, rgba(0,0,0,0.03) 31px)'
                }} />
              </div>

              {/* Social */}
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                    { Icon: Twitter, href: '#', label: 'Twitter' },
                    { Icon: Facebook, href: '#', label: 'Facebook' },
                    { Icon: Instagram, href: '#', label: 'Instagram' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-400 rounded-xl flex items-center justify-center transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
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

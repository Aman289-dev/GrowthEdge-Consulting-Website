import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import api from '../../utils/api';
import { SERVICE_OPTIONS } from '../../utils/constants';

const inputClass = 'w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm';
const labelClass = 'block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide';

export default function AppointmentModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', preferredDate: '', preferredTime: '', message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/appointments', form);
      toast.success('Strategy call booked! We\'ll confirm within 4 hours.');
      setForm({ name: '', email: '', phone: '', company: '', service: '', preferredDate: '', preferredTime: '', message: '' });
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to book — please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative bg-[#0D1117] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/15 border border-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-white">Book a Strategy Call</h2>
                  <p className="text-xs text-slate-500">We'll confirm within 4 business hours</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    className={inputClass} placeholder="Alex Johnson" />
                </div>
                <div>
                  <label className={labelClass}>Work Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    className={inputClass} placeholder="alex@company.com" />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    className={inputClass} placeholder="+1 (888) 000-0000" />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input name="company" value={form.company} onChange={handleChange}
                    className={inputClass} placeholder="Your Company" />
                </div>
                <div>
                  <label className={labelClass}>Area of Interest</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className={`${inputClass} appearance-none`}>
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred Date</label>
                  <input name="preferredDate" type="date" value={form.preferredDate} onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Preferred Time (EST)</label>
                  <select name="preferredTime" value={form.preferredTime} onChange={handleChange}
                    className={`${inputClass} appearance-none`}>
                    <option value="">Select a time</option>
                    {['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Tell Us About Your Challenge</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Briefly describe your business challenge or goal..." />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={onClose}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 text-sm font-medium transition-all">
                  Cancel
                </button>
                <Button type="submit" loading={loading} className="flex-1">
                  Book Strategy Call
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

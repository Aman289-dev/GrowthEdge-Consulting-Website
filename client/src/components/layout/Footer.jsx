import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Youtube, Mail, Phone, MapPin, ArrowRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/about#team' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'AI & Innovation Strategy', href: '/services#ai-strategy' },
  { label: 'Digital Transformation', href: '/services#digital-transformation' },
  { label: 'Growth Acceleration', href: '/services#growth-acceleration' },
  { label: 'Data Intelligence', href: '/services#data-intelligence' },
  { label: 'Operational Excellence', href: '/services#operational-excellence' },
];

const resourceLinks = [
  { label: 'Blog & Insights', href: '/blog' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/subscribe', { email });
      toast.success('Subscribed! Welcome to NexaEdge insights.');
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#06080F] border-t border-slate-800/60 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Nexa<span className="text-gradient">Edge</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
              Empowering enterprises with AI-powered strategy, digital transformation, and data intelligence. Building the future, one breakthrough at a time.
            </p>
            <div className="flex gap-2">
              {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800/60 hover:bg-indigo-600 text-slate-500 hover:text-white transition-all duration-200 border border-slate-700/50 hover:border-indigo-500"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold font-display mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-slate-500 hover:text-slate-200 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold font-display mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-slate-500 hover:text-slate-200 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold font-display mb-4 text-sm uppercase tracking-wider">Stay Sharp</h4>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Weekly insights on AI, strategy, and digital innovation.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-60"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                <span>hello@nexaedge.io</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Phone className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                <span>+1 (888) 963-2947</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span>350 Fifth Ave, New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} NexaEdge Consulting. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

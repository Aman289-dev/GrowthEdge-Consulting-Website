import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/about#team' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Business Strategy', href: '/services#business-strategy' },
  { label: 'Digital Transformation', href: '/services#digital-transformation' },
  { label: 'Market Research', href: '/services#market-research' },
  { label: 'Financial Planning', href: '/services#financial-planning' },
  { label: 'Operational Excellence', href: '/services#operational-excellence' },
];

const socialIcons = {
  linkedin: Linkedin, twitter: Twitter, facebook: Facebook, instagram: Instagram,
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.post('/subscribe', { email });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 font-bold text-xl text-white mb-3">
              <span>GrowthEdge</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 mb-1 inline-block" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Empowering businesses with strategic clarity, operational excellence, and sustainable growth since 2009.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Informed</h4>
            <p className="text-sm text-slate-400 mb-4">
              Get strategic insights and industry updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-60"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>hello@growthedge.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>+1 (555) 234-5678</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GrowthEdge Consulting. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

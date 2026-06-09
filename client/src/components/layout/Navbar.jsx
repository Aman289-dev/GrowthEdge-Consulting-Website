import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import Button from '../ui/Button';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar({ onBookConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#06080F]/90 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Nexa<span className="text-gradient">Edge</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === href
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onBookConsultation}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Book Strategy Call
            </Button>
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#06080F]/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl lg:hidden"
          >
            <div className="px-4 py-5 space-y-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === href
                      ? 'text-indigo-400 bg-indigo-500/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-800">
                <Button onClick={onBookConsultation} className="w-full">
                  Book Strategy Call
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

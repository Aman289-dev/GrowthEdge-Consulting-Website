import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Zap } from 'lucide-react';

export default function NotFound() {
  useEffect(() => { document.title = '404 — Page Not Found — NexaEdge'; }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#06080F] pt-16 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-6">
          <Zap className="w-8 h-8 text-indigo-400" />
        </div>

        <div className="text-8xl font-display font-bold text-gradient mb-4">
          404
        </div>
        <h1 className="text-2xl font-display font-bold text-slate-100 mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-lg shadow-indigo-500/20"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600 font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </main>
  );
}

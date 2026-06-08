import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock } from 'lucide-react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-blue-600" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">GrowthEdge Support</div>
                  <div className="text-blue-200 text-xs">Online now</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl rounded-tl-sm p-4">
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                  👋 Hi there! Welcome to GrowthEdge Consulting.
                </p>
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed mt-2">
                  We'll be right with you. In the meantime, feel free to leave a message and we'll get back to you shortly!
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Business hours: Mon–Fri, 9AM–6PM EST</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3 text-xs text-slate-500 dark:text-slate-400 text-center">
                Average response time: <span className="font-semibold text-blue-600 dark:text-blue-400">under 2 hours</span>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors flex-shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center text-white transition-colors"
        aria-label="Open chat"
      >
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30" />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

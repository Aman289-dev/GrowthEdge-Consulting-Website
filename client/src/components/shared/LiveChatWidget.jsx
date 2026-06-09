import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock, Zap } from 'lucide-react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="absolute bottom-16 right-0 w-80 bg-[#0D1117] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-600" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm font-display">NexaEdge Support</div>
                  <div className="text-indigo-200 text-xs">Online · Avg. reply in 2h</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="bg-slate-800/60 rounded-xl rounded-tl-sm p-3.5">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Hi there! Welcome to NexaEdge Consulting.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mt-1.5">
                  We're here to help you achieve breakthrough results. Leave a message and our team will respond shortly.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Clock className="w-3 h-3" />
                <span>Business hours: Mon–Fri, 8AM–7PM EST</span>
              </div>

              <div className="bg-slate-900 rounded-lg p-2.5 text-xs text-slate-500 text-center border border-slate-800">
                Response time: <span className="font-semibold text-indigo-400">under 2 hours</span>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm bg-slate-900 text-slate-200 placeholder:text-slate-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-slate-800"
              />
              <button className="w-8 h-8 bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center justify-center text-white transition-colors flex-shrink-0">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-13 h-13 w-[52px] h-[52px] bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-xl shadow-indigo-500/30 flex items-center justify-center text-white transition-colors"
        aria-label="Open chat"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-25" />
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

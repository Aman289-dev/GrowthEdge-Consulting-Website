import { clsx } from 'clsx';

const colors = {
  blue:   'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  green:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  amber:  'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  slate:  'bg-slate-800 text-slate-400 border border-slate-700',
  cyan:   'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  rose:   'bg-rose-500/10 text-rose-400 border border-rose-500/20',
};

export default function Badge({ children, color = 'indigo', className = '' }) {
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', colors[color], className)}>
      {children}
    </span>
  );
}

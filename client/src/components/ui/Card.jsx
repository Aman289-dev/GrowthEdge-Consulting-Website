import { clsx } from 'clsx';

export default function Card({ children, className = '', hover = false, padding = true, glow = false }) {
  return (
    <div
      className={clsx(
        'bg-[#0D1117] rounded-2xl border border-slate-800',
        glow && 'border-indigo-500/20 shadow-lg shadow-indigo-500/5',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer',
        padding && 'p-6',
        className
      )}
    >
      {children}
    </div>
  );
}

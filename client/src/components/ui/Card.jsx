import { clsx } from 'clsx';

export default function Card({ children, className = '', hover = false, padding = true }) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer',
        padding && 'p-6',
        className
      )}
    >
      {children}
    </div>
  );
}

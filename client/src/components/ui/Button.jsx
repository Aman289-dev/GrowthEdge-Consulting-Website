import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:       'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/25 hover:shadow-xl',
  secondary:     'border border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-indigo-300 bg-transparent',
  accent:        'bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold shadow-lg hover:shadow-cyan-500/25 hover:shadow-xl',
  ghost:         'text-slate-400 hover:text-slate-100 hover:bg-white/5',
  white:         'bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg font-bold',
  'white-outline':'border-2 border-white/80 text-white hover:bg-white hover:text-indigo-700',
  danger:        'bg-red-600 hover:bg-red-500 text-white shadow-lg',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#06080F] disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
}

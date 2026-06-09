import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function LoadingSpinner({ size = 'md', className = '', text }) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };

  return (
    <div className={clsx('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={clsx('animate-spin text-indigo-500', sizeClasses[size])} />
      {text && <p className="text-slate-500 text-sm">{text}</p>}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06080F]">
      <LoadingSpinner size="lg" text="Loading..." />
    </div>
  );
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#0D1117] rounded-2xl border border-slate-800 p-6 animate-pulse">
          <div className="h-3 bg-slate-800 rounded mb-4 w-1/3" />
          <div className="h-5 bg-slate-800 rounded mb-2.5" />
          <div className="h-3 bg-slate-800 rounded mb-3 w-5/6" />
          <div className="h-3 bg-slate-800 rounded w-4/6" />
        </div>
      ))}
    </div>
  );
}

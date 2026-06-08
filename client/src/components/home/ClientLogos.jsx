const clients = [
  'Meridian Group', 'NexMart', 'Vantage Corp', 'Brightline', 'Cortex Tech',
  'Apex Capital', 'Summit Partners', 'Horizon Ventures', 'PrecisionCraft', 'TrueNorth Co',
  'Meridian Group', 'NexMart', 'Vantage Corp', 'Brightline', 'Cortex Tech',
  'Apex Capital', 'Summit Partners', 'Horizon Ventures', 'PrecisionCraft', 'TrueNorth Co',
];

export default function ClientLogos() {
  return (
    <section className="py-14 bg-slate-50 dark:bg-slate-900/70 border-y border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500">
          Trusted by industry leaders
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {clients.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-8 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <span className="text-slate-500 dark:text-slate-400 font-semibold text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

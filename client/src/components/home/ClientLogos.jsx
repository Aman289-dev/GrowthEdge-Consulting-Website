const clients = [
  'Stripe', 'Palantir', 'Databricks', 'Snowflake', 'Confluent',
  'HashiCorp', 'MongoDB', 'Elastic', 'Twilio', 'Cloudflare',
  'Stripe', 'Palantir', 'Databricks', 'Snowflake', 'Confluent',
  'HashiCorp', 'MongoDB', 'Elastic', 'Twilio', 'Cloudflare',
];

export default function ClientLogos() {
  return (
    <section className="py-14 bg-[#06080F] border-y border-slate-800/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-slate-600">
          Trusted by world-class organizations
        </p>
      </div>
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#06080F] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#06080F] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-4 whitespace-nowrap">
          {clients.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-7 py-2.5 bg-slate-900/50 rounded-lg border border-slate-800/60"
            >
              <span className="text-slate-600 font-semibold text-sm tracking-wide">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
